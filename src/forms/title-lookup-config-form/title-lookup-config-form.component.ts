import { Component, effect, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputComponent } from '@libComponents/input/input.component';
import { nnfc, urlValidator } from '@utils/form.util';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputComponent ],
	selector: 'app-title-lookup-config-form',
	templateUrl: './title-lookup-config-form.component.html',
	host: { 'class': 'flex flex-col' }
})
export class TitleLookupConfigFormComponent extends BaseComponent {

	// Input
	url = input.required<string | null>();

	// Output
	save = output<string>();

	// Form
	protected fcUrl = nnfc<string>('', [ Validators.required, urlValidator() ]);

	constructor() {

		super();
		effect(() => {

			const url = this.url();
			if (url)
				untracked(() => { this.fcUrl.setValue(url); });

		});

	}

	onSave(): void {

		if (this.fcUrl.valid)
			this.save.emit(this.fcUrl.value as string);

	}

}
