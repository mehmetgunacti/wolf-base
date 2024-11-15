import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CompactNoteComponent } from '@components/compact-note/compact-note.component';
import { BaseComponent } from '@libComponents/base.component';
import { TagsContainerComponent } from '@libComponents/tags-container/tags-container.component';
import { Store } from '@ngrx/store';
import { selCore_pinnedNotes } from '@selectors/core/core-configuration.selectors';
import { selNote_pinnedArray } from '@selectors/note/note-ui.selectors';
import { compareISODateStrings } from '@utils/date-time.util';
import { map } from 'rxjs';

@Component({
	selector: 'app-pinned-notes-container',
	standalone: true,
	imports: [ CommonModule, TagsContainerComponent, CompactNoteComponent ],
	templateUrl: './pinned-notes.container.html',
	host: { 'class': 'flex flex-col gap-1 md:gap-2 @container' }
})
export class PinnedNotesContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected tags = this.store.selectSignal(selCore_pinnedNotes);
	protected notes$ = this.store.select(selNote_pinnedArray).pipe(
		map(notes => notes.sort((n1, n2) => compareISODateStrings(n1.modified, n2.modified)))
	);

}
