import { Component, effect, input, output, untracked } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlyphDirective } from '@directives/glyph.directive';
import { RequiredValidatorDirective } from '@directives/required-validator.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputTagComponent } from '@libComponents/input-tag/input-tag.component';

@Component({
	standalone: true,
	imports: [ RequiredValidatorDirective, ReactiveFormsModule, GlyphDirective, InputTagComponent ],
	selector: 'app-tag-form',
	templateUrl: './tag.form.html',
	host: { 'class': 'flex flex-col' }
})
export class TagForm extends BaseComponent {

	// Input
	tags = input.required<string[]>();
	tagSuggestions = input<string[]>([]);

	// Output
	save = output<string[]>();
	tagInput = output<string | null>();

	// Form
	protected form: FormControl<string[]> = new FormControl<string[]>([], { validators: [ Validators.required ], nonNullable: true });

	constructor() {

		super();
		effect(() => {

			const tags = this.tags();
			if (tags)
				untracked(() => this.form.setValue(tags));

		});

	}

	onSave(): void {

		if (this.form.invalid)
			return;

		this.save.emit(this.form.value);
		this.form.reset(this.tags());

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

}
