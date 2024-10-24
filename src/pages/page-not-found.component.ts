import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-page-not-found',
	standalone: true,
	imports: [],
	template: '<p>page-not-found works!</p>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent { }
