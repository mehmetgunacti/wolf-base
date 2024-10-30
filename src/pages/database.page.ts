import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'database-page',
	standalone: true,
	imports: [],
	template: `
		<p>database-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabasePage { }
