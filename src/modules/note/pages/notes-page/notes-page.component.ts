import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-notes-page',
	templateUrl: './notes-page.component.html',
	styleUrls: ['./notes-page.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPageComponent { }
