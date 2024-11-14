import { coreActions, entityActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppEntityType, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent, MarkdownEditorComponent, PortalComponent } from '@libComponents';
import { Note, NoteContent } from '@models';
import { Store } from '@ngrx/store';
import { selNoteContent_content, selNote_SelectedEntity } from '@selectors';
import { filter, take, tap, withLatestFrom } from 'rxjs';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective, MarkdownEditorComponent, PortalComponent, AsyncPipe ],
	selector: 'app-note-content-form-container',
	templateUrl: './note-content-form-container.component.html',
	host: { 'class': 'comp p-4' }
})
export class NoteContentFormContainer extends BaseComponent {

	private store: Store = inject(Store);

	note$ = this.store.select(selNote_SelectedEntity);

	fcContent: FormControl = new FormControl('', { validators: [ Validators.required ], nonNullable: true });

	constructor() {

		super();
		this.store.select(selNoteContent_content).pipe(
			takeUntilDestroyed(),
			tap(content => this.fcContent.setValue(content?.content))
		).subscribe();

	}

	onSaveClose(): void {

		this.note$.pipe(
			filter((note): note is Note => !!note),
			withLatestFrom(this.store.select(selNoteContent_content)),
			take(1)
		).subscribe(([ note, noteContent ]) => {

			if (noteContent)
				this.store.dispatch(entityActions.update({ entityType: AppEntityType.noteContent, id: note.id, entity: { name: note.name, content: this.fcContent.value } }));
			else
				this.store.dispatch(entityActions.create({ entityType: AppEntityType.noteContent, entity: { id: note.id, name: note.name, content: this.fcContent.value } as NoteContent }));

		});

	}

	onSave(): void {

		// todo
		this.onSaveClose();

	}

	onCancel(id: UUID): void {

		this.store.dispatch(coreActions.navigate({ url: [ '/notes', id ] }));

	}

}
