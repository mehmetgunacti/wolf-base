import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';

@Component({
	selector: 'logs-page',
	standalone: true,
	imports: [],
	template: `
		<p>logs-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class LogsPage extends BaseComponent { }
