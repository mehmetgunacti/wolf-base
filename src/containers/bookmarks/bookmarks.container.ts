import { bookmarkActions } from '@actions/bookmark.actions';
import { Component, computed, inject } from '@angular/core';
import { BookmarkComponent } from '@components/bookmark/bookmark.component';
import { UUID } from '@constants/common.constant';
import { BookmarkEditContainer } from '@dialogs/bookmark-edit/bookmark-edit.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ModalComponent } from '@libComponents/modal/modal.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Store } from '@ngrx/store';
import { selBM_filteredBookmarks } from '@selectors/bookmark/bookmark-tags.selectors';
import { selBookmark_formVisible, selBookmark_shaking, selBookmark_tagsVisible } from '@selectors/bookmark/bookmark-ui.selectors';

@Component({
	imports: [ BookmarkComponent, PortalComponent, ModalComponent, BookmarkEditContainer, GlyphDirective ],
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks.container.html',
	host: { 'class': '' }
})
export class BookmarksContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected formVisible = this.store.selectSignal(selBookmark_formVisible);
	protected tagsVisible = this.store.selectSignal(selBookmark_tagsVisible);
	protected isShaking = this.store.selectSignal(selBookmark_shaking);

//	protected bookmarks$: Observable<ClickedBookmark[]>;

	private bookmarks = this.store.selectSignal(selBM_filteredBookmarks);
	protected filteredBookmarks = computed(

		() => this.bookmarks().sort((b1, b2) => b2.clicks - b1.clicks)

	);

	onEdit(id: UUID): void {

		this.store.dispatch(bookmarkActions.openEditDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(bookmarkActions.togglePopularTag({ id }));

	}

	onLinkClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

	}

	onTagClicked(name: string): void {

		this.store.dispatch(bookmarkActions.setSelectedTags({ tags: [ name ] }));

	}

	openFormDialog(): void {

		this.store.dispatch(bookmarkActions.openFormDialog());

	}

	closeFormDialog(): void {

		this.store.dispatch(bookmarkActions.closeFormDialog());

	}

	fromClipboard(): void {

		this.store.dispatch(bookmarkActions.fromClipboard());

	}

}
