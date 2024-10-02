import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-test-suite-page',
	templateUrl: './test-suite-page.component.html',
	styleUrls: ['./test-suite-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSuitePageComponent { }
