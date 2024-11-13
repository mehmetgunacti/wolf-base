import { coreActions, entityActions } from '@actions';
import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEntityType, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent, PortalComponent } from '@libComponents';
import { Note, NoteContent } from '@models';
import { Store } from '@ngrx/store';
import { selNote_SelectedEntity, selNote_selectedEntityChildren, selNote_selectedEntityParents, selNoteContent_content } from '@selectors';
import { NoteContentComponent } from 'components/note-content/note-content.component';
import { NoteComponent } from 'components/note/note.component';
import { map, Observable } from 'rxjs';

@Component({
	standalone: true,
	imports: [ CdkMenuModule, RouterLink, GlyphDirective, PortalComponent, AsyncPipe, NoteContentComponent, NoteComponent ],
	selector: 'app-note-container',
	templateUrl: './note.container.html',
	host: { 'class': 'comp p-4' }
})
export class NoteContainer extends BaseComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;
	parents$: Observable<Note[]>;
	children$: Observable<Note[]>;
	content$: Observable<NoteContent | null>;

	constructor() {

		super();
		this.note$ = this.store.select(selNote_SelectedEntity);
		this.parents$ = this.store.select(selNote_selectedEntityParents);
		this.children$ = this.store.select(selNote_selectedEntityChildren).pipe(
			map(c => c.sort((n1, n2) => n1.name.localeCompare(n2.name)))
		);
		this.content$ = this.store.select(selNoteContent_content);

	}

	navTo(url: string[]): void {

		this.store.dispatch(coreActions.navigate({ url }));

	}

	onRemove(id: UUID): void {

		if (confirm(`Note will be deleted. Continue?`))
			this.store.dispatch(entityActions.moveToTrash({ entityType: AppEntityType.note, id }));

	}

}
