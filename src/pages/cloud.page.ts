import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents';

@Component({
	selector: 'cloud-page',
	standalone: true,
	imports: [],
	template: `
		<p>cloud-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class CloudPage extends BaseComponent { }
