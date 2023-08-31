import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogMessage } from 'lib';
import { Observable } from 'rxjs';
import { selLogsAll } from 'store/selectors/logs.selectors';

@Component({
	selector: 'app-logs-list-container',
	templateUrl: './logs-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListContainerComponent {

	private store: Store = inject(Store);

	list$: Observable<LogMessage[]>;

	constructor() {

		this.list$ = this.store.select(selLogsAll);

	}

}
