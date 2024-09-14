import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Quote, UUID } from '@lib';

interface QuoteForm {

	id: FormControl<UUID | null>,
	name: FormControl<string | null>,
	author: FormControl<string | null>,
	context: FormControl<string | null>

}

@Component({
	selector: 'app-quote-settings-form',
	templateUrl: './quote-settings-form.component.html',
	styleUrls: ['./quote-settings-form.component.scss'],
	host: { 'class': 'd-flex-column p' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSettingsFormComponent {

	protected form: FormGroup<QuoteForm>;

	// @Input
	quote = input<Quote | null>();

	// @Output
	create = output<Partial<Quote>>();
	update = output<Quote>();
	delete = output<UUID>();
	reset = output<void>();

	protected isUpdate = computed(() => !!this.quote()?.id);

	constructor() {

		this.form = new FormGroup<QuoteForm>({

			id: new FormControl(),
			name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
			author: new FormControl(null, { validators: [Validators.minLength(3)] }),
			context: new FormControl(null, { validators: [Validators.minLength(3)] })

		});

		effect(() => {

			const val = this.quote();
			if (val)
				this.form.setValue(val);
			else
				this.resetForm();

		}, { allowSignalWrites: true });

	}

	onSave(): void {

		if (this.isUpdate())
			this.update.emit(this.form.value as Quote);
		else
			this.create.emit(this.form.value as Partial<Quote>);

	}

	private resetForm(): void {

		this.form.reset();

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
