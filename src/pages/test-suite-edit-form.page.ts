import { Component } from '@angular/core';
import { TestSuiteEditFormContainer } from '@containers/test-suite-edit-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ TestSuiteEditFormContainer ],
	selector: 'project-edit-form-page',
	template: `<app-test-suite-edit-form-container/>`,
	host: { 'class': 'page' }
})
export class TestSuiteEditFormPage extends BaseComponent { }
