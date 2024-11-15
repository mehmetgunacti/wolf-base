import { bookmarkActions } from '@actions';
import { Component, inject } from '@angular/core';
import { CompactBookmarkComponent } from '@components/compact-bookmark/compact-bookmark.component';
import { UUID } from '@constants';
import { BaseComponent, TagsContainerComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import * as bmSelectors from 'store/selectors/bookmark/bookmark-clicks.selectors';
import * as coreSelectors from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-popular-bookmarks-container',
	standalone: true,
	imports: [ CompactBookmarkComponent, TagsContainerComponent ],
	templateUrl: './popular-bookmarks.container.html',
	host: { 'class': 'flex flex-col gap-1 md:gap-2 @container' }
})
export class PopularBookmarksContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected tags = this.store.selectSignal(coreSelectors.selCore_popularBookmarks);
	protected bookmarks = this.store.selectSignal(bmSelectors.selBookmark_popular);

	onClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

	}

}
