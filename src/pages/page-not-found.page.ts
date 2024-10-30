import { Component } from '@angular/core';
import { BaseComponent } from '@components';

@Component({
	selector: 'page-not-found-page',
	standalone: true,
	imports: [],
	template: `
		<p>page-not-found works!</p>
	`,
	host: { 'class': 'page' }
})
export class PageNotFoundPage extends BaseComponent { }
