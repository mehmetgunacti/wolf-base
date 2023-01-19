import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bookmark } from 'blueprints';

@Component({
	selector: 'app-bookmark-list',
	templateUrl: './bookmark-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkListComponent {

	@Input() bookmarks: Bookmark[] | null | undefined = [];

}
