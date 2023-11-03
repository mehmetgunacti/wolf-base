import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { openAddBookmarkDialog } from 'store/actions/bookmark-ui.actions';
import { fromClipboard } from 'store/actions/bookmark.actions';
import { selBookmarkShaking } from 'store/selectors/bookmark-ui.selectors';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	styleUrls: ['./bookmarks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent {

	isBigScreen$: Observable<boolean>;
	isShaking$: Observable<boolean>;

	private store: Store = inject(Store);

	constructor() {

		this.isBigScreen$ = this.store.select(selCoreIsBigScreen);
		this.isShaking$ = this.store.select(selBookmarkShaking)

	}

	openAddDialog(): void {

		this.store.dispatch(openAddBookmarkDialog());

	}

	fromClipboard(): void {

		this.store.dispatch(fromClipboard());

	}

}
