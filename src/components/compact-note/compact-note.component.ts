import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TAG_PINNED } from '@constants/bookmark.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Note } from '@models/note.model';
import { TimePastPipe } from '@pipes/time-past.pipe';

@Component({
	standalone: true,
	imports: [ GlyphDirective, RouterLink, TimePastPipe ],
	selector: 'app-compact-note',
	templateUrl: './compact-note.component.html',
	host: { 'class': 'block comp comp-hover comp-active' }
})
export class CompactNoteComponent extends BaseComponent {

	protected TAG_PINNED = TAG_PINNED;

	// Input
	note = input.required<Note>();

}
