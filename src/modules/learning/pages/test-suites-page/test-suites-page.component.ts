import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-test-suites-page',
	templateUrl: './test-suites-page.component.html',
	styleUrls: ['./test-suites-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSuitesPageComponent { }
