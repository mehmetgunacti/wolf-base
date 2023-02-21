import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bookmark, PLACEHOLDER_QUESTIONMARK } from 'lib';
import { isInvalid } from 'modules/shared';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { EditForm } from './bookmark-form';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnChanges, OnDestroy {
	PLACEHOLDER_QUESTIONMARK = PLACEHOLDER_QUESTIONMARK;

	@Input() bookmark: Bookmark | null | undefined;

	@Output() save: EventEmitter<Bookmark> = new EventEmitter();

	bookmark$: BehaviorSubject<Bookmark>;
	form: EditForm;
	subscriptions: Subscription = new Subscription();
	formGroup: FormGroup;
	formName: FormControl;

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

}
