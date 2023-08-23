import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { slideUpDownTrigger } from 'modules/shared';
import { Observable } from 'rxjs';
import { clickTag, emptySelectedTags, search } from 'store/actions/bookmark-tags.actions';
import { closeEditBookmarkDialog, openAddBookmarkDialog, toggleSearchAndTagCloudVisibility } from 'store/actions/bookmark-ui.actions';
import { selectedTags } from 'store/selectors/bookmark-tags.selectors';
import { isEditDialogVisible, sltTagCloudVisibility } from 'store/selectors/bookmark-ui.selectors';
import { isBigScreen } from 'store/selectors/core-ui.selectors';

@Component({
	selector: 'app-bookmarks-page',
	templateUrl: './bookmarks-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideUpDownTrigger]
})
export class BookmarksPageComponent {

	editDialogVisible$: Observable<boolean>;
	tagsVisible$: Observable<boolean>;
	isBigScreen$: Observable<boolean>;
	selectedTags$: Observable<string[]>;

	private store: Store = inject(Store);

	constructor() {

		this.editDialogVisible$ = this.store.select(isEditDialogVisible);
		this.tagsVisible$ = this.store.select(sltTagCloudVisibility);
		this.isBigScreen$ = this.store.select(isBigScreen);
		this.selectedTags$ = this.store.select(selectedTags);

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

	emptyFilter(): void {

		this.store.dispatch(emptySelectedTags());

	}

}
