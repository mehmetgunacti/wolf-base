import { projectActions } from '@actions/project.actions';
import { Component, inject, output } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';
import { SearchBoxComponent } from '@libComponents/search-box/search-box.component';
import { Store } from '@ngrx/store';
import { selProject_search } from '@selectors/project/project-ui.selectors';

@Component({
	standalone: true,
	imports: [ SearchBoxComponent ],
	selector: 'app-project-filter-container',
	template: '<w-search-box [term]="term()" (search)="onSearch($event)"/>'
})
export class ProjectFilterContainer extends BaseComponent {

	private store: Store = inject(Store);

	// Input
	term = this.store.selectSignal(selProject_search);

	// Output
	search = output<string>();

	onSearch(term: string): void {

		this.store.dispatch(projectActions.search({ term }));

	}

}
