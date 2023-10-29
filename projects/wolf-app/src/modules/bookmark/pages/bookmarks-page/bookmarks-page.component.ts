import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { slideUpDownTrigger } from '@lib';
import { Observable } from 'rxjs';
import { clickTag, emptySelectedTags, search } from 'store/actions/bookmark-tags.actions';
import { closeEditBookmarkDialog, openAddBookmarkDialog, toggleSearchAndTagCloudVisibility } from 'store/actions/bookmark-ui.actions';
import { selectedTags } from 'store/selectors/bookmark-tags.selectors';
import { selTagCloudVisibility } from 'store/selectors/bookmark-ui.selectors';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	styleUrls: ['./bookmarks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class BookmarksPageComponent {

	tagsVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;

	private store: Store = inject(Store);

	constructor() {

		this.tagsVisible$ = this.store.select(selTagCloudVisibility);
		this.isBigScreen$ = this.store.select(selCoreIsBigScreen);

	}

	onSearch(term: string): void {

		this.store.dispatch(search({ term }));

	}

	toggleTagCloud(): void {

		this.store.dispatch(toggleSearchAndTagCloudVisibility());

	}

	openAddDialog(): void {

		this.store.dispatch(openAddBookmarkDialog());

	}

	closeAddDialog(): void {

		this.store.dispatch(closeEditBookmarkDialog());

	}

	onTagClicked(name: string): void {

		this.store.dispatch(clickTag({ name }));

	}

}
