import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogCategory, UUID } from 'lib';
import { loadLogs } from 'store/actions/logs.actions';

@Component({
	selector: 'app-logs-filter-pane-container',
	templateUrl: './logs-filter-pane-container.component.html',
	styleUrls: ['./logs-filter-pane-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsFilterPaneContainerComponent {

	@Output() search: EventEmitter<string> = new EventEmitter();

	private store: Store = inject(Store);

	onCategory(category: LogCategory): void {

		this.store.dispatch(loadLogs({ category }));

	}

	onEntityId(entityId: UUID): void {

		this.store.dispatch(loadLogs({ entityId }));

	}

}
