import { Component } from '@angular/core';
import { BaseComponent } from '@components';

@Component({
	selector: 'showcase-page',
	standalone: true,
	imports: [],
	template: `
		<p>showcase-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class ShowcasePage extends BaseComponent { }
