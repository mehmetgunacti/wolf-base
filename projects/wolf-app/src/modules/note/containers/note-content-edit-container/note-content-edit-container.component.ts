import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Note, NoteContent, UUID } from 'lib';
import { Observable } from 'rxjs';
import { selNoteContent, selNoteSelected } from 'store/selectors/note-selectors/note-entities.selectors';

@Component({
	selector: 'app-note-content-edit-container',
	templateUrl: './note-content-edit-container.component.html',
	styleUrls: ['./note-content-edit-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentEditContainerComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;
	content$: Observable<NoteContent | null>;

	fcContent: FormControl = new FormControl('', { validators: [Validators.required], nonNullable: true });

	constructor() {

		this.note$ = this.store.select(selNoteSelected);
		this.content$ = this.store.select(selNoteContent);

	}

	onSave(): void {

		console.log('save content');

	}

	onRemove(): void {

		console.log('delete content');
		// this.store.dispatch(moveToTrash({ id }));

	}

}
