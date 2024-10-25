import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-bookmarks-page',
	standalone: true,
	imports: [],
	templateUrl: './bookmarks-page.component.html',
	styleUrl: './bookmarks-page.component.scss',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent {

}
