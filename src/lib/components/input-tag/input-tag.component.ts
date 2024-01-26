import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { filterArrayElements } from 'lib/utils';
import { BehaviorSubject, Observable, combineLatest, filter, fromEvent, map, merge, startWith, tap } from 'rxjs';

@Component({
	selector: 'w-input-tag',
	templateUrl: './input-tag.component.html',
	styleUrls: ['./input-tag.component.scss']
})
export class InputTagComponent implements OnInit {

	@ViewChild('element', { static: true }) e!: ElementRef<HTMLInputElement>;

	@Input() control: FormControl<string[]> = new FormControl<string[]>([], { nonNullable: true });
	@Input() name: string = '';
	@Input() set suggestions(arr: string[] | null) {

		this._suggestions.next(arr ?? []);

	}

	@Output() tagInput = new EventEmitter<string | null>();

	@HostBinding('class.error') error = false;

	tags$!: Observable<string[]>;
	hasValue$!: Observable<boolean>;

	_suggestions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	suggestions$!: Observable<string[]>;

	ngOnInit(): void {

		// filter non-selected tags
		this.suggestions$ = this._suggestions.asObservable().pipe(

			map(arr => filterArrayElements(arr, this.control.value))

		);

		// when <input> has focus and Enter key is pressed
		const enter$: Observable<string> = fromEvent<KeyboardEvent>(this.e.nativeElement, 'keydown').pipe(

			filter((event: KeyboardEvent) => event.key === 'Enter'),
			tap(event => event.preventDefault()),
			map(() => this.e.nativeElement.value += ' ')

		);

		// whenever the value of <input> changes
		const input$: Observable<string> = fromEvent<InputEvent>(this.e.nativeElement, 'input').pipe(

			map(event => (event.target as HTMLInputElement).value)

		);

		// whenever value entered
		const onInput$: Observable<string> = merge(enter$, input$).pipe(

			startWith(''),
			tap(val => this.emitInputValue(val))

		)

		// emit changes to tags array
		this.tags$ = this.control.valueChanges.pipe(

			startWith(this.control.value),
			tap(() => this.tagInput.emit(null)) // clear suggestions popup

		);

		// set .error class
		const status$: Observable<FormControlStatus> = this.control.statusChanges.pipe(

			startWith(this.control.status),
			tap((status: FormControlStatus) => this.error = status === 'INVALID' && this.control.dirty)

		);

		// toggle .up class on <label>
		this.hasValue$ = combineLatest([
			this.tags$,
			onInput$,
			status$
		]).pipe(

			map(([tags, val]) => tags.length > 0 || !!val)

		);

	}

	private emitInputValue(val: string): void {

		// Check for trailing space
		const hasTrailingSpace = val.endsWith(' ');

		// only characters a-z, 0-9 and '-' are acceptable tag names
		const tagName = val.trim().toLowerCase().replace(/[^a-z0-9-]/gi, '');

		// return if user has entered / pasted only invalid characters
		if (tagName.length < 1) {

			this.e.nativeElement.value = '';
			return;

		}

		if (hasTrailingSpace) {

			// check if already in tag list
			if (this.control.value.includes(tagName)) {

				this.e.nativeElement.value = tagName; // removes trailing space
				return;

			}

			// add to tag list
			this.control.setValue([...this.control.value, tagName]);
			this.control.markAsDirty();
			this.control.updateValueAndValidity();

			// set input value to empty space
			this.e.nativeElement.value = '';

			return;

		}

		// emit value to receive tag suggestions
		this.tagInput.emit(tagName);

	}

	removeTag(t: string): void {

		const tags: string[] = this.control.value;

		this.control.setValue(tags.filter(item => item !== t));
		this.control.markAsDirty();
		this.control.updateValueAndValidity();

		// this.onBlur();

	}

}
