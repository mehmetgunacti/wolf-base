import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { openAddBookmarkDialog } from 'store/actions/bookmark-ui.actions';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	styleUrls: ['./bookmarks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent {


	isBigScreen$: Observable<boolean>;

	private store: Store = inject(Store);

	constructor() {

		this.isBigScreen$ = this.store.select(selCoreIsBigScreen);

	}

	openAddDialog(): void {

		this.store.dispatch(openAddBookmarkDialog());

	}

}
