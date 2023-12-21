import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem, Note } from 'lib/models';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['./note.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {



	@Input() note: Note | null | undefined;
	@Input() children: Note[] = [];

}
