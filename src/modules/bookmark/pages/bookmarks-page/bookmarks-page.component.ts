import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { delayDestroyTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromClipboard, openAddBookmarkDialog } from 'store/actions/bookmark.actions';
import { selBookmarkShaking } from 'store/selectors/bookmark/bookmark-ui.selectors';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	styleUrls: ['./bookmarks-page.component.scss'],
	animations: [delayDestroyTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent {

	isShaking$: Observable<boolean>;

	private store: Store = inject(Store);

	constructor() {

		this.isShaking$ = this.store.select(selBookmarkShaking);

	}

	openAddDialog(): void {

		this.store.dispatch(openAddBookmarkDialog());

	}

	fromClipboard(): void {

		this.store.dispatch(fromClipboard());

	}

}
