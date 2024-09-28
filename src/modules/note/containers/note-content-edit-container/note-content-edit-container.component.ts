import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppEntityType, Note, NoteContent, UUID } from 'lib';
import { Observable, filter, take, tap, withLatestFrom } from 'rxjs';
import { coreActions, entityActions } from 'store/actions';
import { selNoteContent_content } from 'store/selectors/note-content/note-content-ui.selectors';
import { selNote_SelectedEntity } from 'store/selectors/note/note-ui.selectors';

@Component({
	selector: 'app-note-content-edit-container',
	templateUrl: './note-content-edit-container.component.html',
	styleUrls: ['./note-content-edit-container.component.scss'],
	host: { 'class': 'd-flex-column gap-sm flex-1' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentEditContainerComponent {

	private store: Store = inject(Store);

	note$: Observable<Note | null>;

	fcContent: FormControl = new FormControl('', { validators: [Validators.required], nonNullable: true });

	constructor() {

		this.note$ = this.store.select(selNote_SelectedEntity);
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
		).subscribe(([note, noteContent]) => {

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

		this.store.dispatch(coreActions.navigate({ url: ['/notes', id] }));

	}

}
