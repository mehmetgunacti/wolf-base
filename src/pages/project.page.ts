import { Component } from '@angular/core';
import { ProjectContainer } from '@containers/project/project.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ ProjectContainer ],
	selector: 'project-page',
	template: `<app-project-container/>`,
	host: { 'class': 'page' }
})
export class ProjectPage extends BaseComponent { }
