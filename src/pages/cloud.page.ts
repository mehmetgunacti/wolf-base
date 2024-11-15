import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [],
	selector: 'cloud-page',
	template: `<p>cloud-page works!</p>`,
	host: { 'class': 'page' }
})
export class CloudPage extends BaseComponent { }
