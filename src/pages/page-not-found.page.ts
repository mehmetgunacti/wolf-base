import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'page-not-found-page',
	standalone: true,
	imports: [],
	template: `
		<p>page-not-found works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundPage { }
