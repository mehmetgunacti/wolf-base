import { Component } from '@angular/core';
import { BaseComponent } from '@components';

@Component({
	selector: 'words-page',
	standalone: true,
	imports: [],
	template: `
		<p>words-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class WordsPage extends BaseComponent { }
