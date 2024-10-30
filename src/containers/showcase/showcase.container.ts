import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { slideUpDownTrigger } from '@animations';
import { GlyphName, Glyphs, PROJECT_STATUS } from '@constants';
import { GlyphDirective } from '@directives';
import * as component from '@libComponents';
import { BaseComponent } from '@libComponents';

@Component({
	standalone: true,
	imports: [
		ReactiveFormsModule,
		GlyphDirective,
		component.SwitchComponent,
		component.ToastComponent,
		component.InputTagComponent,
		component.TextareaComponent,
		component.SelectComponent,
		component.MarkdownEditorComponent
	],
	selector: 'app-showcase-container',
	templateUrl: './showcase.container.html',
	host: {
		'class': 'grid'
	},
	animations: [ slideUpDownTrigger ],
})
export class ShowcaseContainer extends BaseComponent {

	PROJECT_STATUS = PROJECT_STATUS;

	alertsVisible = signal<boolean>(false);
	formsVisible = signal<boolean>(false);
	buttonsVisible = signal<boolean>(true);
	glyphsVisible = signal<boolean>(false);

	tagSuggestions = signal<string[]>([]);

	glyphNames = signal<GlyphName[]>(Object.keys(Glyphs) as GlyphName[]);

	form = new FormGroup({
		'text': new FormControl('', Validators.required),
		'tags': new FormControl('', Validators.required),
		'area': new FormControl('', Validators.required),
		'status': new FormControl<string>('', [ Validators.required ]),
		'editor': new FormControl<string>('', { validators: [ Validators.required ], nonNullable: true }),
	});

	editor(): FormControl<string> {

		return this.form.controls[ 'editor' ];

	}

	onTagInput(val: string | null): void {

		if (val !== null)
			this.tagSuggestions.update(() => [ 'abc', 'def', 'ghi' ].filter(v => v.includes(val)));

	}

}
