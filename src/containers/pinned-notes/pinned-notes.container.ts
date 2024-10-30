import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CompactNoteComponent } from '@components';
import { GlyphDirective } from '@directive';
import { BaseComponent, TagsContainerComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { compareISODateStrings } from '@utils';
import { map } from 'rxjs';
import * as coreSelectors from 'store/selectors/core/core-configuration.selectors';
import * as noteSelectors from 'store/selectors/note/note-ui.selectors';

@Component({
	selector: 'app-pinned-notes-container',
	standalone: true,
	imports: [ CommonModule, GlyphDirective, TagsContainerComponent, CompactNoteComponent ],
	templateUrl: './pinned-notes.container.html',
	host: { 'class': 'flex flex-col gap-1 md:gap-2 @container' }
})
export class PinnedNotesContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected tags = this.store.selectSignal(coreSelectors.selCore_pinnedNotes);
	protected notes$ = this.store.select(noteSelectors.selNote_pinnedArray).pipe(
		map(notes => notes.sort((n1, n2) => compareISODateStrings(n1.modified, n2.modified)))
	);

}
