import { CommonModule } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
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
import { ToastService } from '@libComponents/toast/toast.service';
import { Store } from '@ngrx/store';
import { selNote_EntityList } from '@selectors/entity/entity-note.selectors';
import { fc, fg, nnfc } from '@utils/form.util';
import { SelectTreeComponent } from "../../lib/components/select/select-tree.component";
import { coreActions } from '@actions/core.actions';
import { ChoicesComponent } from '@libComponents/choices/choices.component';

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
		CroppieComponent,
		SelectTreeComponent,
		ChoicesComponent
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

	private store: Store = inject(Store);
	private toast = inject(ToastService);

	protected alertsVisible = signal<boolean>(false);
	protected formsVisible = signal<boolean>(true);
	protected buttonsVisible = signal<boolean>(false);
	protected toastsVisible = signal<boolean>(false);
	protected glyphsVisible = signal<boolean>(false);

	protected nodes = this.store.selectSignal(selNote_EntityList);
	protected tagSuggestions = signal<string[]>([]);

	protected glyphNames = signal<GlyphName[]>(Object.keys(Glyphs) as GlyphName[]);

	protected modelSwitch = model<boolean>(false);
	protected form = fg({
		'croppie': fc<string>(''),
		'text': nnfc<string>(''),
		'tags': nnfc<string>(''),
		'area': nnfc<string>(''),
		'status': nnfc<string>(''),
		'editor': nnfc<string | null>(null),
		'switches': fg({
			'default': fc<boolean>(true),
			'success': fc<boolean>(true),
			'info': fc<boolean>(true),
			'warn': fc<boolean>(true),
			'error': fc<boolean>(true)
		}),
		'choices': fc<boolean[]>([ true, false, false, true, false ])
	});

	onTagInput(val: string | null): void {

		if (val !== null)
			this.tagSuggestions.update(() => [ 'abc', 'def', 'ghi' ].filter(v => v.includes(val)));

	}

	onOpenToast(severity: 'success' | 'error' | 'info' | 'warn'): void {

		const summary = severity.charAt(0).toUpperCase() + severity.substr(1) + ' Toast';
		this.toast.show({ severity, summary, detail: 'Details here' });

	}

	showProgressBar(): void {

		this.store.dispatch(coreActions.showProgressBar());

	}

	hideProgressBar(): void {

		this.store.dispatch(coreActions.hideProgressBar());

	}

}
