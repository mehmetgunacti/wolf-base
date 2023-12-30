import { Component, inject } from '@angular/core';
import { LogCategory, slideUpDownTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { loadLogs } from 'store/actions/logs.actions';

@Component({
	selector: 'app-logs-page',
	templateUrl: './logs-page.component.html',
	styleUrls: ['./logs-page.component.scss'],
	animations: [slideUpDownTrigger]
})
export class LogsPageComponent {

	private store: Store = inject(Store);

	constructor() {

		this.store.dispatch(loadLogs({ category: LogCategory.notification }));

	}

}
