import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { projectActions } from 'store/actions';
import { selProject_search } from 'store/selectors/project/project-ui.selectors';

@Component({
	selector: 'app-project-filter-container',
	template: '<w-search-box [term]="term()" (search)="onSearch($event)"/>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFilterContainerComponent {

	private store: Store = inject(Store);

	// Input
	term = this.store.selectSignal(selProject_search);

	// Output
	search = output<string>();

	onSearch(term: string): void {

		this.store.dispatch(projectActions.search({ term }));

	}

}
