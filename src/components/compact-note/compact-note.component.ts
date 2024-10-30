import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TAG_PINNED } from '@constants';
import { GlyphDirective } from '@directive';
import { BaseComponent } from '@libComponents';
import { TimePastPipe } from '@pipes';
import { Note } from 'lib/models';

@Component({
	selector: 'app-compact-note',
	standalone: true,
	imports: [ GlyphDirective, RouterLink, TimePastPipe ],
	templateUrl: './compact-note.component.html',
	host: { 'class': 'block comp comp-hover comp-active' }
})
export class CompactNoteComponent extends BaseComponent {

	protected TAG_PINNED = TAG_PINNED;

	// Input
	note = input.required<Note>();

}
