import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuItem, Note, NoteContent, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { moveToTrash } from 'store/actions/note.actions';
import { selNoteContent_content } from 'store/selectors/note-content-selectors/note-content-entities.selectors';
import { selNote_selected, selNote_selectedEntityChildren, selNote_selectedEntityParents } from 'store/selectors/note-selectors/note-entities.selectors';

@Component({
	selector: 'app-note-container',
	templateUrl: './note-container.component.html',
	styleUrls: ['./note-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContainerComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;
	parents$: Observable<Note[]>;
	children$: Observable<Note[]>;
	content$: Observable<NoteContent | null>;

	constructor() {

		this.note$ = this.store.select(selNote_selected);
		this.parents$ = this.store.select(selNote_selectedEntityParents);

		// .pipe(
		// 	map(
		// 		notes => notes.map(note => ({
		// 			label: note.name,
		// 			url: ['/notes', note.id]
		// 		}))
		// 	)
		// );
		this.children$ = this.store.select(selNote_selectedEntityChildren);
		this.content$ = this.store.select(selNoteContent_content);

	}

	navTo(url: string[]): void {

		this.store.dispatch(navigate({ url }));

	}

	onRemove(id: UUID): void {

		// this.store.dispatch(moveToTrash({ id }));
		console.log('not implemented');

	}

}
