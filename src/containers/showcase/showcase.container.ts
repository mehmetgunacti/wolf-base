import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations/slide-in-out.animation';
import { GlyphName, Glyphs } from '@constants/glyphs.constant';
import { PROJECT_STATUS } from '@constants/project.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { AlertComponent } from '@libComponents/alert/alert.component';
import { BaseComponent } from '@libComponents/base.component';
import { CroppieComponent } from '@libComponents/croppie/croppie.component';
import { InputTagComponent } from '@libComponents/input-tag/input-tag.component';
import { InputComponent } from '@libComponents/input/input.component';
import { MarkdownEditorComponent } from '@libComponents/markdown/markdown-editor.component';
import { SelectComponent } from '@libComponents/select/select.component';
import { SwitchComponent } from '@libComponents/switch/switch.component';
import { TextareaComponent } from '@libComponents/textarea/textarea.component';
import { fc, fg, nnfc } from '@utils/form.util';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		GlyphDirective,
		InputComponent,
		SwitchComponent,
		AlertComponent,
		InputTagComponent,
		TextareaComponent,
		SelectComponent,
		MarkdownEditorComponent,
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

	form = fg({
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
