import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogCategory, LogMessage } from 'lib';
import { Observable } from 'rxjs';
import { loadLogs } from 'store/actions/logs.actions';
import { selLogsAll } from 'store/selectors/logs.selectors';

@Component({
	selector: 'app-logs-list-container',
	templateUrl: './logs-list-container.component.html',
	styleUrls: ['./logs-list-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListContainerComponent {

	private store: Store = inject(Store);

	logMessages$: Observable<LogMessage[]>;

	constructor() {

		this.logMessages$ = this.store.select(selLogsAll);

	}

	onRefresh(): void {

		this.store.dispatch(loadLogs({ category: LogCategory.notification }));

	}

}
