import { logActions } from '@actions/logs.actions';
import { Component, inject, output } from '@angular/core';
import { UUID } from '@constants/common.constant';
import { BaseComponent } from '@libComponents/base.component';
import { SearchBoxComponent } from '@libComponents/search-box/search-box.component';
import { Store } from '@ngrx/store';
import { selProject_search } from '@selectors/project/project-ui.selectors';

@Component({
	imports: [ SearchBoxComponent ],
	selector: 'app-logs-filter-container',
	template: '<w-search-box [term]="term()" (search)="onSearch($event)"/>'
})
export class LogsFilterContainer extends BaseComponent {

	private store: Store = inject(Store);

	// Input
	term = this.store.selectSignal(selProject_search);

	// Output
	search = output<string>();

	onSearch(selectedId: UUID): void {

		this.store.dispatch(logActions.load({ selectedId, categories: [] }));

	}

}
