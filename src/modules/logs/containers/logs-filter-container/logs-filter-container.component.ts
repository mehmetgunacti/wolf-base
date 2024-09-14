import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogCategory, UUID } from 'lib';
import { Observable } from 'rxjs';
import { load } from 'store/actions/logs.actions';
import { selLogs_selectedId } from 'store/selectors/log/logs.selectors';

@Component({
	selector: 'app-logs-filter-container',
	templateUrl: './logs-filter-container.component.html',
	styleUrls: ['./logs-filter-container.component.scss'],
	host: { 'class': 'box shadow transition-bg' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsFilterContainerComponent {

	selectedId$: Observable<UUID | null>;

	@Output() search: EventEmitter<string> = new EventEmitter();

	private store: Store = inject(Store);

	constructor() {

		this.selectedId$ = this.store.select(selLogs_selectedId);

	}

	onCategory(category: LogCategory): void {

		this.store.dispatch(load({ selectedId: null, categories: [category] }));

	}

	onEntityId(selectedId: UUID): void {

		this.store.dispatch(load({ selectedId, categories: [] }));

	}

}
