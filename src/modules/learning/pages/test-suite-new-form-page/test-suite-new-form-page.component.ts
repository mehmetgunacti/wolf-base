import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-test-suite-new-form-page',
	templateUrl: './test-suite-new-form-page.component.html',
	styleUrls: ['./test-suite-new-form-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSuiteNewFormPageComponent { }
