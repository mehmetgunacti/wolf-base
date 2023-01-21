import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bookmark } from 'lib';
import { isInvalid } from 'modules/shared';

@Component({
	selector: 'app-bookmark-form',
	templateUrl: './bookmark-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkFormComponent implements OnChanges {

	@Input() bookmark: Bookmark | null | undefined;

	@Output() save: EventEmitter<Bookmark> = new EventEmitter();

	form: FormGroup;

	constructor(
		fb: FormBuilder
	) {

		this.form = fb.group({
			id: [''],
			name: ['', Validators.required],
			title: ['', Validators.required],
			tags: ['', Validators.required],
			image: ['', Validators.required],
			url: ['', Validators.required],
			clicks: ['', Validators.required],
		});

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
