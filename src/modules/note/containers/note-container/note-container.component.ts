import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppEntityType, Note, NoteContent, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { moveToTrash } from 'store/actions/entity.actions';
import { selNoteContent_content } from 'store/selectors/note-content-selectors/note-content-entities.selectors';
import { selNote_selectedEntityChildren, selNote_selectedEntityParents } from 'store/selectors/note-selectors/note-entities.selectors';
import { selSelectedEntity } from 'store/selectors/note-selectors/note-entity.selectors';

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

		this.note$ = this.store.select(selSelectedEntity);
		this.parents$ = this.store.select(selNote_selectedEntityParents);
		this.children$ = this.store.select(selNote_selectedEntityChildren).pipe(
			map(c => c.sort((n1, n2) => n1.name.localeCompare(n2.name)))
		);
		this.content$ = this.store.select(selNoteContent_content);

	}

	navTo(url: string[]): void {

		this.store.dispatch(navigate({ url }));

	}

	onRemove(id: UUID): void {

		if (confirm(`Note will be deleted. Continue?`))
			this.store.dispatch(moveToTrash({ entityType: AppEntityType.note, id }));

	}

}
