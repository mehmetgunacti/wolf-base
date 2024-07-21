import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Quote, UUID, isInvalid } from '@lib';

interface QuoteForm {

	id: FormControl<UUID | null>,
	name: FormControl<string>,
	author: FormControl<string | null>,
	context: FormControl<string | null>

}

@Component({
	selector: 'app-quote-settings-form',
	templateUrl: './quote-settings-form.component.html',
	styleUrls: ['./quote-settings-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsFormComponent {

	form: FormGroup<QuoteForm> = new FormGroup({

		id: new FormControl<UUID | null>(null),
		name: new FormControl<string>('“”', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
		author: new FormControl<string | null>(null, { validators: [Validators.minLength(3)] }),
		context: new FormControl<string | null>(null, { validators: [Validators.minLength(3)] })

	});


	@Input() set quote(val: Quote | null) {

		if (val)
			this.form.setValue(val);
		else
			this.resetForm();

	}

	@Output() create: EventEmitter<Partial<Quote>> = new EventEmitter();
	@Output() update: EventEmitter<Quote> = new EventEmitter();
	@Output() delete: EventEmitter<UUID> = new EventEmitter();
	@Output() reset: EventEmitter<void> = new EventEmitter();

	onSave(): void {

		if (isInvalid(this.form))
			return;

		if (this.form.controls.id.value)
			this.update.emit(this.form.value as Quote);
		else
			this.create.emit(this.form.value as Partial<Quote>);

	}

	private resetForm(): void {

		this.form.reset({
			id: null,
			name: '“”',
			author: null,
			context: null
		});

	}

	onReset(): void {

		this.resetForm();
		this.reset.emit();

	}

	onDelete(id: UUID | null): void {

		if (id)
			if (confirm('Delete Quote?'))
				this.delete.emit(id);

	}

}
