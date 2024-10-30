import { ChangeDetectionStrategy, Component, effect, input, output, untracked } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlyphDirective, InputTagComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputTagComponent ],
	selector: 'app-tag-form',
	templateUrl: './tag-form.component.html',
	host: { 'class': 'flex flex-col' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagFormComponent {

	// Input
	tags = input.required<string[]>();
	tagSuggestions = input<string[]>([]);

	// Output
	save = output<string[]>();
	tagInput = output<string | null>();

	// Form
	protected form: FormControl<string[]> = new FormControl<string[]>([], { validators: [ Validators.required ], nonNullable: true });

	constructor() {

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
