import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'notes-page',
	standalone: true,
	imports: [],
	template: `
		<p>notes-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPage { }
