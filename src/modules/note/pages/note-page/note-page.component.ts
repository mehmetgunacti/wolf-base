import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-note-page',
	templateUrl: './note-page.component.html',
	styleUrls: ['./note-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotePageComponent { }
