import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogCategory } from 'lib';
import { Observable } from 'rxjs';
import { setSelectedCategory } from 'store/actions/logs.actions';
import { selLogsSelectedCategory } from 'store/selectors/logs.selectors';

@Component({
	selector: 'app-logs-filter-pane-container',
	templateUrl: './logs-filter-pane-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsFilterPaneContainerComponent {

	@Output() search: EventEmitter<string> = new EventEmitter();

	selectedCategory$: Observable<LogCategory | null>;

	constructor(private store: Store) {

		this.selectedCategory$ = store.select(selLogsSelectedCategory);

	}

	onCategory(category: LogCategory): void {

		this.store.dispatch(setSelectedCategory({ category }));

	}

}