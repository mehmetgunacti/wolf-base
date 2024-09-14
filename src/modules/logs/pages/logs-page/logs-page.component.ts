import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-logs-page',
	templateUrl: './logs-page.component.html',
	styleUrls: ['./logs-page.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsPageComponent { }
