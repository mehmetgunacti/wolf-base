import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-note-content-form-page',
	templateUrl: './note-content-form-page.component.html',
	styleUrls: ['./note-content-form-page.component.scss'],
	host: { 'class': 'd-flex-column h-100' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteContentFormPageComponent { }
