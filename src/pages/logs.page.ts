import { Component } from '@angular/core';
import { LogsFilterContainer } from '@containers/logs-filter.container';
import { LogsContainer } from '@containers/logs/logs.container';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'logs-page',
	imports: [ LogsFilterContainer, LogsContainer ],
	template: `
		<app-logs-filter-container/>
		<app-logs-container/>
	`,
	host: { 'class': 'page' }
})
export class LogsPage extends BaseComponent { }
