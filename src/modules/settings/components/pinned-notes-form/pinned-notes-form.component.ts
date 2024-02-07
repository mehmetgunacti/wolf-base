import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { elseEmptyArray } from '@lib';
import { tap } from 'rxjs';

@Component({
	selector: 'app-pinned-notes-form',
	templateUrl: './pinned-notes-form.component.html',
	styleUrls: ['./pinned-notes-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinnedNotesFormComponent {

	tags = input<string[], string[] | null>([], { transform: elseEmptyArray<string> });
	tagSuggestions = input<string[], string[] | null>([], { transform: elseEmptyArray<string> });
	control: FormControl<string[]> = new FormControl<string[]>([], { validators: [Validators.required], nonNullable: true });

	@Output() save: EventEmitter<string[]> = new EventEmitter();
	@Output() tagInput: EventEmitter<string | null> = new EventEmitter();

	constructor() {

		// on incoming 'tags' set control value
		toObservable(this.tags).pipe(

			takeUntilDestroyed(),
			tap(tags => this.control.setValue(tags))

		).subscribe();

	}

	onSave(): void {

		if (this.control.invalid)
			return;

		this.save.emit(this.control.value);
		this.control.reset(this.tags());

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

}
