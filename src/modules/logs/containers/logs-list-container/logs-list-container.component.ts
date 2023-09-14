import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogMessage } from 'lib';
import { Observable } from 'rxjs';
import { loadLogs, toggleFilterPane } from 'store/actions/logs.actions';
import { selLogsAll } from 'store/selectors/logs.selectors';

@Component({
	selector: 'app-logs-list-container',
	templateUrl: './logs-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListContainerComponent {

	private store: Store = inject(Store);

	logMessages$: Observable<LogMessage[]>;

	constructor() {

		this.logMessages$ = this.store.select(selLogsAll);

	}

	onRefresh(): void {

		this.store.dispatch(loadLogs());

	}

	onFilter(): void {

		this.store.dispatch(toggleFilterPane());

	}

}
