import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogMessage, UUID } from 'lib';
import { Observable } from 'rxjs';
import { logActions } from 'store/actions';
import { selLogs_allEntries, selLogs_selectedId } from 'store/selectors/log/logs.selectors';

@Component({
	selector: 'app-logs-list-container',
	templateUrl: './logs-list-container.component.html',
	styleUrls: ['./logs-list-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListContainerComponent {

	private store: Store = inject(Store);

	logMessages$: Observable<LogMessage[]>;
	selectedId$: Observable<UUID | null>;

	constructor() {

		this.logMessages$ = this.store.select(selLogs_allEntries);
		this.selectedId$ = this.store.select(selLogs_selectedId);

	}

	onRefresh(): void {

		this.store.dispatch(logActions.refresh());

	}

}
