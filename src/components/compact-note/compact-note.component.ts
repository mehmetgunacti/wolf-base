import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TAG_PINNED } from '@constants';
import { TimePastPipe } from '@pipes';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { Note } from 'lib/models';

@Component({
	selector: 'app-compact-note',
	standalone: true,
	imports: [ GlyphDirective, RouterLink, TimePastPipe ],
	templateUrl: './compact-note.component.html',
	host: { 'class': 'block comp comp-hover comp-active' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompactNoteComponent {

	protected TAG_PINNED = TAG_PINNED;

	// Input
	note = input.required<Note>();

}
