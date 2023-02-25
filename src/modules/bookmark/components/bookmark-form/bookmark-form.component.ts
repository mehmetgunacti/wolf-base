import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bookmark } from 'lib';
import { isInvalid } from 'modules/shared';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { EditForm } from './bookmark-form';
import * as fromStore from '../../store';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnChanges, OnDestroy {

	@Input() bookmark: Bookmark | null | undefined;

	@Output() save: EventEmitter<Bookmark> = new EventEmitter();
	@Output() tagInput: EventEmitter<string> = new EventEmitter();

	bookmark$: BehaviorSubject<Bookmark>;
	form: EditForm;
	subscriptions: Subscription = new Subscription();
	tagboxSuggestions$!: Observable<string[]>;
	formGroup: FormGroup;
	formName: FormControl;
	t1: string = '';

	constructor() {

		this.formName = new FormControl('');
		this.form = new EditForm(this.bookmark);
		this.formGroup = this.form.formGroup;
		this.bookmark$ = new BehaviorSubject(this.bookmark || {} as Bookmark);

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

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		this.form.destroy();
	}

	ngOnChanges(changes: SimpleChanges): void {

		const bookmark: Bookmark = changes['bookmark']?.currentValue;
		if (bookmark)
			this.form.formGroup.patchValue({
				...bookmark,
			});

	}

	onSave(): void {

		if (isInvalid(this.form.formGroup))
			return;

		this.save.emit(this.form.formGroup.value);

	}

	onTagInput(event: Event): void {

		console.log(event);
		// this.tagInput.next(val);

	}

}
