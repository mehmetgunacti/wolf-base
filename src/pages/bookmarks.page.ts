import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';

@Component({
	selector: 'bookmarks-page',
	standalone: true,
	imports: [],
	template: `
		<p>bookmarks-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class BookmarksPage extends BaseComponent { }
