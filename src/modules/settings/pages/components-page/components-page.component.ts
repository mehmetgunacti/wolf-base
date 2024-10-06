import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Glyphs, PROJECT_STATUS, slideUpDownTrigger } from '@lib';

@Component({
	selector: 'app-components-page',
	templateUrl: './components-page.component.html',
	styleUrls: ['./components-page.component.scss'],
	animations: [slideUpDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent {

	PROJECT_STATUS = PROJECT_STATUS;

	alertsVisible = signal<boolean>(false);
	formsVisible = signal<boolean>(true);
	buttonsVisible = signal<boolean>(false);
	glyphsVisible = signal<boolean>(false);

	tagSuggestions = signal<string[]>([]);

	glyphList = signal<Glyphs[]>(Object.values(Glyphs));

	form = new FormGroup({
		'text': new FormControl('', Validators.required),
		'tags': new FormControl('', Validators.required),
		'area': new FormControl('', Validators.required),
		'status': new FormControl<string>('', [Validators.required]),
		'editor': new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
	});

	editor(): FormControl<string> {

		return this.form.controls['editor'];

	}

	onTagInput(val: string | null): void {

		if (val !== null)
			this.tagSuggestions.update(() => ['abc', 'def', 'ghi'].filter(v => v.includes(val)));

	}

}
