import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-test-suite-edit-form-page',
	templateUrl: './test-suite-form-edit-page.component.html',
	styleUrls: ['./test-suite-form-edit-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSuiteEditFormPageComponent { }
