import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-note-form-page',
	templateUrl: './note-form-page.component.html',
	styleUrls: ['./note-form-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormPageComponent { }
