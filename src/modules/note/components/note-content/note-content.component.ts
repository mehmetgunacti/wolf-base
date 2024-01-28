import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Note, NoteContent } from 'lib/models';

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrl: './note-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent {

	note: InputSignal<Note | null> = input.required();
	content: InputSignal<NoteContent | null> = input.required();

}
