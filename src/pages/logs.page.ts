import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'logs-page',
	standalone: true,
	imports: [],
	template: `
		<p>logs-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsPage { }
