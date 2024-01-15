import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogMessage, UUID } from 'lib';
import { Observable } from 'rxjs';
import { refresh } from 'store/actions/logs.actions';
import { selLogs_allEntries, selLogs_selectedId } from 'store/selectors/logs.selectors';

@Component({
	selector: 'app-database-list-container',
	templateUrl: './database-list-container.component.html',
	styleUrls: ['./database-list-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabaseListContainerComponent {

	private store: Store = inject(Store);

	logMessages$: Observable<LogMessage[]>;
	selectedId$: Observable<UUID | null>;

	constructor() {

		this.logMessages$ = this.store.select(selLogs_allEntries);
		this.selectedId$ = this.store.select(selLogs_selectedId);

	}

	onRefresh(): void {

		this.store.dispatch(refresh());

	}

}
