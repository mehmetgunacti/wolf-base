import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteContentComponent } from '@components/note-content/note-content.component';
import { NoteComponent } from '@components/note/note.component';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Note, NoteContent } from '@models/note.model';
import { Store } from '@ngrx/store';
import { selNoteContent_content } from '@selectors/note-content/note-content-ui.selectors';
import { selNote_SelectedEntity, selNote_selectedEntityChildren, selNote_selectedEntityParents } from '@selectors/note/note-ui.selectors';
import { map, Observable } from 'rxjs';

@Component({
	standalone: true,
	imports: [ CdkMenuModule, RouterLink, GlyphDirective, PortalComponent, AsyncPipe, NoteContentComponent, NoteComponent ],
	selector: 'app-note-container',
	templateUrl: './note.container.html',
	host: { 'class': 'flex flex-col gap-1 md:gap-2' }
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
