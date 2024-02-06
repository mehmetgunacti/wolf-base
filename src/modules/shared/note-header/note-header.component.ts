import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { TAG_PINNED } from '@lib';
import { Note } from 'lib/models';

@Component({
	selector: 'app-note-header',
	templateUrl: './note-header.component.html',
	styleUrls: ['./note-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteHeaderComponent {

	TAG_PINNED = TAG_PINNED;

	note: InputSignal<Note> = input.required();

}
