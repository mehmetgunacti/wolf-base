import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Note } from 'lib/models';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['./note.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {

	note = input.required<Note>();
	parents = input<Note[]>([]);
	children = input<Note[]>([]);

}
