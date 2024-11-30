import { Component } from '@angular/core';
import { TestSuiteNewFormContainer } from '@containers/test-suite-new-form.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ TestSuiteNewFormContainer ],
	selector: 'project-new-form-page',
	template: `<app-test-suite-new-form-container/>`,
	host: { 'class': 'page' }
})
export class TestSuiteNewFormPage extends BaseComponent { }
