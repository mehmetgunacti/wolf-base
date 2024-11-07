import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selNote_filteredNotes } from '@selectors';

@Component({
	standalone: true,
	imports: [ RouterLink, GlyphDirective ],
	selector: 'app-notes-container',
	templateUrl: './notes.container.html',
	host: { 'class': 'comp p-4' }
})
export class NotesContainer extends BaseComponent {

	private notes = inject(Store).selectSignal(selNote_filteredNotes);
	protected sortedNotes = computed(() => this.notes().sort((a, b) => a.name.localeCompare(b.name)));

}
