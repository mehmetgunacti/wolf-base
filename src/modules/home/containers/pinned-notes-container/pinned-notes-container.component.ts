import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Note, compareISODateStrings } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as coreSelectors from 'store/selectors/core/core-configuration.selectors';
import * as noteSelectors from 'store/selectors/note/note-ui.selectors';

@Component({
	selector: 'app-pinned-notes-container',
	templateUrl: './pinned-notes-container.component.html',
	styleUrls: ['./pinned-notes-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinnedNotesContainerComponent {

	notes$: Observable<Note[]>;
	tags$: Observable<string[]>;

	private store: Store = inject(Store);

	constructor() {

		this.notes$ = this.store.select(noteSelectors.selNote_pinnedArray).pipe(
			map(notes => notes.sort((n1, n2) => compareISODateStrings(n1.modified, n2.modified)))
		);
		this.tags$ = this.store.select(coreSelectors.selCore_pinnedNotes);

	}
}
