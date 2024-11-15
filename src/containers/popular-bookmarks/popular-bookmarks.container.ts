import { bookmarkActions } from '@actions/bookmark.actions';
import { Component, inject } from '@angular/core';
import { CompactBookmarkComponent } from '@components/compact-bookmark/compact-bookmark.component';
import { UUID } from '@constants/common.constant';
import { BaseComponent } from '@libComponents/base.component';
import { TagsContainerComponent } from '@libComponents/tags-container/tags-container.component';
import { Store } from '@ngrx/store';
import { selBookmark_popular } from '@selectors/bookmark/bookmark-clicks.selectors';
import { selCore_popularBookmarks } from '@selectors/core/core-configuration.selectors';

@Component({
	standalone: true,
	imports: [ CompactBookmarkComponent, TagsContainerComponent ],
	selector: 'app-popular-bookmarks-container',
	templateUrl: './popular-bookmarks.container.html',
	host: { 'class': 'flex flex-col gap-1 md:gap-2 @container' }
})
export class PopularBookmarksContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected tags = this.store.selectSignal(selCore_popularBookmarks);
	protected bookmarks = this.store.selectSignal(selBookmark_popular);

	onClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

	}

}
