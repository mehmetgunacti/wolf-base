import { Component } from '@angular/core';
import { TestSuiteContainer } from '@containers/test-suite/test-suite.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ TestSuiteContainer ],
	selector: 'test-suite-page',
	template: `<app-test-suite-container/>`,
	host: { 'class': 'page' }
})
export class TestSuitePage extends BaseComponent { }
