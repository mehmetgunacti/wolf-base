import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
	private editForm: EditForm;
	subscriptions: Subscription = new Subscription();
	form: FormGroup;

	constructor() {

		this.editForm = new EditForm(this.bookmark);
		this.form = this.editForm.getFormGroup();
		this.bookmark$ = new BehaviorSubject(this.bookmark || {} as Bookmark);

	}

	ngOnInit(): void {

		this.subscriptions.add(
			this.form.valueChanges.pipe(

				debounceTime(200),
				distinctUntilChanged()

			).subscribe(
				bookmark => this.bookmark$.next(bookmark)
			)
		);

	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
		this.editForm.destroy();
	}

	ngOnChanges(changes: SimpleChanges): void {

		const bookmark: Bookmark = changes['bookmark']?.currentValue;
		if (bookmark)
			this.form.patchValue({
				...bookmark,
			});

	}

	onSave(): void {

		if (isInvalid(this.form))
			return;

		this.save.emit(this.form.value);

	}

}
