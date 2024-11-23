import { Component } from '@angular/core';
import { ProjectContainer } from '@containers/project/project.container';
import { WordContainer } from '@containers/word/word.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ ProjectContainer ],
	selector: 'project-page',
	template: `<app-project-container/>`,
	host: { 'class': 'page' }
})
export class ProjectPage extends BaseComponent { }
