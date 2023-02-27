import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bookmark } from 'lib';
import { isInvalid } from 'modules/shared';
import { AutoComplete } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { EditForm } from './bookmark-form';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnInit, OnChanges, OnDestroy {

	@Input() bookmark: Bookmark | null | undefined;
	@Input() tagSuggestions: string[] | null | undefined;

	@Output() save: EventEmitter<Bookmark> = new EventEmitter();
	@Output() tagInput: EventEmitter<string> = new EventEmitter();

	@ViewChild('autocomplete') autocompleteCharge!: AutoComplete;

	bookmark$: Subject<Bookmark>;
	tagSuggestions$: Subject<string[]>;
	form: EditForm;
	subscriptions: Subscription = new Subscription();
	formGroup: FormGroup;
	formName: FormControl;
	t1: string = '';

	constructor() {

		this.bookmark$ = new Subject<Bookmark>();
		this.tagSuggestions$ = new Subject<string[]>();
		this.formName = new FormControl('');
		this.form = new EditForm(this.bookmark);
		this.formGroup = this.form.formGroup;

	}

	ngOnInit(): void {

		this.subscriptions.add(
			this.form.formGroup.valueChanges.pipe(

				debounceTime(200),
				distinctUntilChanged()

			).subscribe(
				bookmark => this.bookmark$.next(bookmark)
			)
		);

	}

	ngOnChanges(changes: SimpleChanges): void {

		const bookmark: Bookmark = changes['bookmark']?.currentValue;
		if (bookmark)
			this.form.formGroup.patchValue({
				...bookmark,
			});

		const tagSuggestions: string[] = changes['tagSuggestions']?.currentValue;
		if (tagSuggestions)
			this.tagSuggestions$.next(tagSuggestions);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();
		this.form.destroy();

	}

	onSave(): void {

		if (isInvalid(this.form.formGroup))
			return;

		this.save.emit(this.form.formGroup.value);

	}

	onTagInput(event: { e: InputEvent, query: string }): void {

		if (event.query.endsWith(' ')) {
			this.form.tags.patchValue([...this.form.tags.getRawValue(), event.query.substring(0, event.query.length - 1)]);
			this.tagSuggestions$.next([]);
			this.autocompleteCharge.multiInputEL.nativeElement.value = '';
		} else
			this.tagInput.emit(event.query);

	}

}
