import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, UUID } from 'lib';
import { Observable } from 'rxjs';
import { click, togglePopular } from 'store/actions/note.actions';
import { selNoteRootArray } from 'store/selectors/note-selectors/note-entities.selectors';

@Component({
	selector: 'app-notes-container',
	templateUrl: './notes-container.component.html',
	styleUrls: ['./notes-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesContainerComponent {

	private store: Store = inject(Store);
	notes$: Observable<Note[]>;

	constructor() {

		this.notes$ = this.store.select(selNoteRootArray);

	}

	onEdit(id: UUID): void {

	}

	onPopular(id: UUID): void {

		this.store.dispatch(togglePopular({ id }));

	}

	onClick(id: UUID): void {

		this.store.dispatch(click({ id }));

	}

}
