import { Component } from '@angular/core';
import { BaseComponent } from '@components';

@Component({
	selector: 'database-page',
	standalone: true,
	imports: [],
	template: `
		<p>database-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class DatabasePage extends BaseComponent { }
