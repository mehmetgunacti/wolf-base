import { Component } from '@angular/core';
import { BaseComponent } from '@components';

@Component({
	selector: 'notes-page',
	standalone: true,
	imports: [],
	template: `
		<p>notes-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class NotesPage extends BaseComponent { }
