import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Quote, UUID } from '@lib';

@Component({
	selector: 'app-quote-settings-form',
	templateUrl: './quote-settings-form.component.html',
	styleUrls: ['./quote-settings-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsFormComponent {

	fcId: FormControl<UUID | null> = new FormControl<UUID | null>("1");
	fcName: FormControl<string> = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true });
	fcAuthor: FormControl<string | null> = new FormControl<string | null>(null);
	fcContext: FormControl<string | null> = new FormControl<string | null>(null);

	@Input() set quote(val: Quote | null) {

		if (val) {

			this.fcId.setValue(val.id);
			this.fcName.setValue(val.name);
			this.fcAuthor.setValue(val.author);
			this.fcContext.setValue(val.context);

		}

	}

	@Output() save: EventEmitter<Partial<Quote>> = new EventEmitter();
	@Output() delete: EventEmitter<UUID> = new EventEmitter();

	onSave(): void {

		if (this.fcName.invalid)
			return;

		const output: Partial<Quote> = {

			name: this.fcName.value,
			author: this.fcAuthor.value ?? null,
			context: this.fcContext.value ?? null

		};

		if (this.fcId.value)
			output['id'] = this.fcId.value;

		this.save.emit(output);

	}

	onReset(): void {

		this.fcId.setValue(null);
		this.fcName.setValue('');
		this.fcName.markAsPristine();
		this.fcAuthor.setValue(null);
		this.fcContext.setValue(null);

	}

	onDelete(id: UUID | null): void {

		if (id)
			if (confirm('Delete Quote?'))
				this.delete.emit(id);

	}

}
