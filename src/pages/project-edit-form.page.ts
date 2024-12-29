import { Component } from '@angular/core';
import { ProjectEditFormContainer } from '@containers/project-edit-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ ProjectEditFormContainer ],
	selector: 'project-edit-form-page',
	template: `<app-project-edit-form-container/>`,
	host: { 'class': 'page' }
})
export class ProjectEditFormPage extends BaseComponent { }
