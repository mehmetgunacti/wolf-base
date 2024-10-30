import { Component } from '@angular/core';
import { BaseComponent } from '@components';

@Component({
	selector: 'projects-page',
	standalone: true,
	imports: [],
	template: `
		<p>projects-page works!</p>
	`,
	host: { 'class': 'page' }
})
export class ProjectsPage extends BaseComponent { }
