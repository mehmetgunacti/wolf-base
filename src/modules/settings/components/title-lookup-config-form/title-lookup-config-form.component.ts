import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-title-lookup-config-form',
	templateUrl: './title-lookup-config-form.component.html',
	styleUrls: ['./title-lookup-config-form.component.scss'],
	host: { 'class': 'd-flex-column p' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLookupConfigFormComponent {

	// Input
	url = input.required<string>();

	// Output
	save = output<string>();

	// Form
	protected fcUrl = new FormControl<string>('', { validators: [Validators.required, Validators.minLength(3)] });

	constructor() {

		effect(() => {

			const url = this.url();
			if (url)
				this.fcUrl.setValue(url);

		}, { allowSignalWrites: true });

	}

	onSave(): void {

		if (this.fcUrl.valid)
			this.save.emit(this.fcUrl.value as string);

	}

}
