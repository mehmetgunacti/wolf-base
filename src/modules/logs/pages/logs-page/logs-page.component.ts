import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearLogs } from 'store/actions/logs.actions';

@Component({
	selector: 'app-logs-page',
	templateUrl: './logs-page.component.html'
})
export class LogsPageComponent {

	private store: Store = inject(Store);

	onClearLogs(): void {

		this.store.dispatch(clearLogs());

	}

}