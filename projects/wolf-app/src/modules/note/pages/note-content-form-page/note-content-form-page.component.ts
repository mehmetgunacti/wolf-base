import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-note-content-form-page',
	templateUrl: './note-content-form-page.component.html',
	styleUrls: ['./note-content-form-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentFormPageComponent { }
