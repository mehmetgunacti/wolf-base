import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { delayDestroyTrigger } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { bookmarkActions } from 'store/actions';
import { selBookmarkShaking } from 'store/selectors/bookmark/bookmark-ui.selectors';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	styleUrls: ['./bookmarks-page.component.scss'],
	animations: [delayDestroyTrigger],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent {

	isShaking$: Observable<boolean>;
	showNew = signal(false);

	private store: Store = inject(Store);

	constructor() {

		this.isShaking$ = this.store.select(selBookmarkShaking);

	}

	open(): void {

		this.showNew.set(true);

	}

	close(): void {

		this.showNew.set(false);

	}

	openAddDialog(): void {

		this.store.dispatch(bookmarkActions.openAddBookmarkDialog());

	}

	fromClipboard(): void {

		this.store.dispatch(bookmarkActions.fromClipboard());

	}

}
