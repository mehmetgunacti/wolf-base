import { Component } from '@angular/core';
import { LogsFilterContainer } from '@containers';
import { BaseComponent } from '@libComponents';
import { LogsContainer } from "../containers/logs/logs.container";

@Component({
	selector: 'logs-page',
	standalone: true,
	imports: [ LogsFilterContainer, LogsContainer ],
	template: `
		<app-logs-filter-container/>
		<app-logs-container/>
	`,
	host: { 'class': 'page' }
})
export class LogsPage extends BaseComponent { }
