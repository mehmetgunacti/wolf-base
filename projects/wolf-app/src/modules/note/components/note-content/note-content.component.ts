import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NoteContent } from 'lib/models';

@Component({
	selector: 'app-note-content',
	templateUrl: './note-content.component.html',
	styleUrls: ['./note-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentComponent {

	@Input() note: NoteContent | null | undefined;

}
