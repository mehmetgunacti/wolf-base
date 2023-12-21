import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuItem, Note } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { selNoteSelected, selNoteSelectedEntityChildren, selNoteSelectedEntityParents } from 'store/selectors/note-selectors/note-entities.selectors';

@Component({
	selector: 'app-note-container',
	templateUrl: './note-container.component.html',
	styleUrls: ['./note-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContainerComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;
	parents$: Observable<MenuItem[]>;
	children$: Observable<Note[]>;

	constructor() {

		this.note$ = this.store.select(selNoteSelected);
		this.parents$ = this.store.select(selNoteSelectedEntityParents).pipe(
			map(
				notes => notes.map(note => ({
					label: note.name,
					url: ['/notes', note.id]
				}))
			)
		);
		this.children$ = this.store.select(selNoteSelectedEntityChildren);

	}

	navTo(url: string[]): void {

		this.store.dispatch(navigate({ url }));

	}

}
