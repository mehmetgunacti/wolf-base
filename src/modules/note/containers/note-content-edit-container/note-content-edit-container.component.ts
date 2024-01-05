import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Note } from 'lib';
import { Observable, filter, take, tap, withLatestFrom } from 'rxjs';
import { create, update } from 'store/actions/note-content.actions';
import { selNoteContent_content } from 'store/selectors/note-content-selectors/note-content-entities.selectors';
import { selNote_selected } from 'store/selectors/note-selectors/note-entities.selectors';

@Component({
	selector: 'app-note-content-edit-container',
	templateUrl: './note-content-edit-container.component.html',
	styleUrls: ['./note-content-edit-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentEditContainerComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;

	fcContent: FormControl = new FormControl('', { validators: [Validators.required], nonNullable: true });

	constructor() {

		this.note$ = this.store.select(selNote_selected);
		this.store.select(selNoteContent_content).pipe(
			takeUntilDestroyed(),
			tap(content => this.fcContent.setValue(content?.content))
		).subscribe();

	}

	onSave(): void {

		this.note$.pipe(
			filter((note): note is Note => !!note),
			withLatestFrom(this.store.select(selNoteContent_content)),
			take(1)
		).subscribe(([note, noteContent]) => {

			if (noteContent)
				this.store.dispatch(update({ id: note.id, content: { name: note.name, content: this.fcContent.value } }));
			else
				this.store.dispatch(create({ content: { id: note.id, name: note.name, content: this.fcContent.value } }));

		});

	}

}
