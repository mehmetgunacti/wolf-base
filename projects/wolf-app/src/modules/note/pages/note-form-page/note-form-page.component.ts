import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Note } from '@lib';

@Component({
	selector: 'app-note-form-page',
	templateUrl: './note-form-page.component.html',
	styleUrls: ['./note-form-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormPageComponent {

	@Input() note: Note | null | undefined;

}
