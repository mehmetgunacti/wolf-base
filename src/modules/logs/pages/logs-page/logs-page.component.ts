import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable } from 'rxjs';
import { loadLogs } from 'store/actions/logs.actions';
import { selLogsFilterPaneVisibility } from 'store/selectors/logs.selectors';

@Component({
	selector: 'app-logs-page',
	templateUrl: './logs-page.component.html',
	animations: [slideUpDownTrigger]
})
export class LogsPageComponent {

	private store: Store = inject(Store);

	filterPaneVisible$: Observable<boolean>;

	constructor() {

		this.filterPaneVisible$ = this.store.select(selLogsFilterPaneVisibility);

		this.store.dispatch(loadLogs());

	}

}