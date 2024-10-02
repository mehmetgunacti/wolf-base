import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TestSuite } from 'lib';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-test-suites-container',
	templateUrl: './test-suites-container.component.html',
	styleUrls: ['./test-suites-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestSuitesContainerComponent {

	private store: Store = inject(Store);

	testSuites$: Observable<TestSuite[]>;

	constructor() {

		this.testSuites$ = of([]);
		// this.store.select(selLearning_filtered).pipe(
		// 	// map(learning => learning.sort((a, b) => a.name.localeCompare(b.name)))
		// );

	}


}
