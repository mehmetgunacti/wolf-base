import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-note-new-form-page',
	templateUrl: './note-new-form-page.component.html',
	styleUrls: ['./note-new-form-page.component.scss'],
	host: { 'class': 'd-flex-column' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteNewFormPageComponent { }
