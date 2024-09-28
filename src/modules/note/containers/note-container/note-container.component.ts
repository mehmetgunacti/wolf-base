import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppEntityType, Note, NoteContent, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { coreActions, entityActions } from 'store/actions';
import { selNoteContent_content } from 'store/selectors/note-content/note-content-ui.selectors';
import { selNote_SelectedEntity, selNote_selectedEntityChildren, selNote_selectedEntityParents } from 'store/selectors/note/note-ui.selectors';

@Component({
	selector: 'app-note-container',
	templateUrl: './note-container.component.html',
	styleUrls: ['./note-container.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContainerComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;
	parents$: Observable<Note[]>;
	children$: Observable<Note[]>;
	content$: Observable<NoteContent | null>;

	constructor() {

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
