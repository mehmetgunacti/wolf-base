import { Component } from '@angular/core';
import { ProjectNewFormContainer } from '@containers/project-new-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ ProjectNewFormContainer ],
	selector: 'project-new-form-page',
	template: `<app-project-new-form-container/>`,
	host: { 'class': 'page' }
})
export class ProjectNewFormPage extends BaseComponent { }
