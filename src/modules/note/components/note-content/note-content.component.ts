import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note, NoteContent } from 'lib/models';

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrl: './note-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent {

	@Input() note: Note | null | undefined;
	@Input() content: NoteContent | null | undefined;

}
