import { Component, computed, effect, input, output, untracked } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UUID } from '@constants';
import { GlyphDirective } from '@directive';
import { BaseComponent, InputComponent, TextareaComponent } from '@libComponents';
import { Quote } from '@models';
import { fc, fg, nnfc } from '@utils';

interface QuoteForm {

	id: FormControl<UUID | null>,
	name: FormControl<string | null>,
	author: FormControl<string | null>,
	context: FormControl<string | null>;

}

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputComponent, TextareaComponent ],
	selector: 'app-quote-settings-form',
	templateUrl: './quote-settings-form.component.html',
	host: { 'class': 'flex flex-col comp' }
})
export class QuoteSettingsFormComponent extends BaseComponent {

	// Input
	quote = input<Quote | null>();

	// Output
	create = output<Partial<Quote>>();
	update = output<Quote>();
	delete = output<UUID>();
	reset = output<void>();

	// Form
	protected form: FormGroup<QuoteForm>;

	protected isUpdate = computed(() => !!this.quote()?.id);

	constructor() {

		super();
		this.form = fg<QuoteForm>({

			id: fc(),
			name: nnfc(null, [ Validators.required, Validators.minLength(3) ]),
			author: nnfc(null, [ Validators.required, Validators.minLength(3) ]),
			context: nnfc(null, [ Validators.required, Validators.minLength(3) ]),

		});

		effect(() => {

			const val = this.quote();
			untracked(() => {

				if (val)
					this.form.setValue(val);
				else
					this.resetForm();

			});

		});

	}

	onSave(): void {

		if (this.form.invalid)
			return;

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
