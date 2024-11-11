import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations';
import { GlyphName, Glyphs, PROJECT_STATUS } from '@constants';
import { GlyphDirective } from '@directives';
import * as component from '@libComponents';
import { BaseComponent } from '@libComponents';
import { fc, fg, nnfc } from '@utils';
import { CroppieComponent } from "../../lib/components/croppie/croppie.component";

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		GlyphDirective,
		component.InputComponent,
		component.SwitchComponent,
		component.AlertComponent,
		component.InputTagComponent,
		component.TextareaComponent,
		component.SelectComponent,
		component.MarkdownEditorComponent,
		CroppieComponent
	],
	selector: 'app-showcase-container',
	templateUrl: './showcase.container.html',
	host: {
		'class': 'grid gap-2'
	},
	animations: [ slideUpDownTrigger ],
})
export class ShowcaseContainer extends BaseComponent {

	PROJECT_STATUS = PROJECT_STATUS;

	alertsVisible = signal<boolean>(false);
	formsVisible = signal<boolean>(true);
	buttonsVisible = signal<boolean>(false);
	glyphsVisible = signal<boolean>(false);

	tagSuggestions = signal<string[]>([]);

	glyphNames = signal<GlyphName[]>(Object.keys(Glyphs) as GlyphName[]);

	form = new FormGroup({
		'croppie': fc<string>(''),
		'text': nnfc<string>(''),
		'tags': nnfc<string>(''),
		'area': nnfc<string>(''),
		'status': nnfc<string>(''),
		'editor': nnfc<string>(''),
		'switches': fg({
			'default': fc<boolean>(true),
			'success': fc<boolean>(true),
			'info': fc<boolean>(true),
			'warn': fc<boolean>(true),
			'error': fc<boolean>(true)
		})
	});

	onTagInput(val: string | null): void {

		if (val !== null)
			this.tagSuggestions.update(() => [ 'abc', 'def', 'ghi' ].filter(v => v.includes(val)));

	}

}
