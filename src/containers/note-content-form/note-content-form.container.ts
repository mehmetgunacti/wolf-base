import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { Component, effect, inject, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { MarkdownEditorComponent } from '@libComponents/markdown/markdown-editor.component';
import { PortalComponent } from '@libComponents/portal.component';
import { NoteContent } from '@models/note.model';
import { Store } from '@ngrx/store';
import { selNoteContent_content, selNoteContent_selectedHasContent } from '@selectors/note-content/note-content-ui.selectors';
import { selNote_SelectedEntity } from '@selectors/note/note-ui.selectors';
import { fc } from '@utils/form.util';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective, MarkdownEditorComponent, PortalComponent, ReactiveFormsModule ],
	selector: 'app-note-content-form-container',
	templateUrl: './note-content-form.container.html',
	host: { 'class': 'comp p-4' }
})
export class NoteContentFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected note = this.store.selectSignal(selNote_SelectedEntity);
	protected contentAvailable = this.store.selectSignal(selNoteContent_selectedHasContent);
	protected fcContent = fc<string | null>(null);

	private content = this.store.selectSignal(selNoteContent_content);

	constructor() {

		super();
		effect(() => {

			const content = this.content();
			if (content)
				untracked(() => this.fcContent.setValue(content.content));

		});

	}

	onSave(content: string): void {

		const note = this.note();
		if (note !== null) {

			if (this.contentAvailable())
				this.store.dispatch(entityActions.update({
					entityType: AppEntityType.noteContent,
					id: note.id,
					entity: { name: note.name, content: this.fcContent.value }
				}));
			else
				this.store.dispatch(entityActions.create({
					entityType: AppEntityType.noteContent,
					entity: {
						id: note.id,
						name: note.name,
						content
					} as NoteContent
				}));

		}

	}

	onCancel(id: UUID): void {

		if (this.fcContent.dirty)
			if (confirm(`Discard changes?`))
				this.store.dispatch(coreActions.navigate({ url: [ '/notes', id ] }));

	}

}
