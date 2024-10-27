import { ChangeDetectionStrategy, Component, effect, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { GlyphDirective, InputComponent } from '@libComponents';
import { nnfc } from '@utils';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, GlyphDirective, InputComponent ],
	selector: 'app-title-lookup-config-form',
	templateUrl: './title-lookup-config-form.component.html',
	host: { 'class': 'flex flex-col comp' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLookupConfigFormComponent {

	// Input
	url = input.required<string>();

	// Output
	save = output<string>();

	// Form
	protected fcUrl = nnfc<string>('', [ Validators.required, Validators.minLength(3) ]);

	constructor() {

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
