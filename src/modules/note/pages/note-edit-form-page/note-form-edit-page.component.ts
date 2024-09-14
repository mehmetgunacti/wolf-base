import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-note-edit-form-page',
	templateUrl: './note-form-edit-page.component.html',
	styleUrls: ['./note-form-edit-page.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditFormPageComponent { }
