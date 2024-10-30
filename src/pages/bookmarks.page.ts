import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'bookmarks-page',
	standalone: true,
	imports: [],
	template: `
		<p>bookmarks-page works!</p>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPage { }
