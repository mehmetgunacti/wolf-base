import { bookmarkActions } from '@actions/bookmark.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookmarkComponent } from '@components/bookmark/bookmark.component';
import { UUID } from '@constants/common.constant';
import { BookmarkEditContainer } from '@containers/bookmark-edit/bookmark-edit.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ModalComponent } from '@libComponents/modal/modal.component';
import { PortalComponent } from '@libComponents/portal.component';
import { ClickedBookmark } from '@models/bookmark.model';
import { Store } from '@ngrx/store';
import { selBM_filteredBookmarks } from '@selectors/bookmark/bookmark-tags.selectors';
import { selBookmark_formVisible, selBookmark_shaking } from '@selectors/bookmark/bookmark-ui.selectors';
import { selBookmark_EntityCount } from '@selectors/entity/entity-bookmark.selectors';
import { Observable, map } from 'rxjs';

@Component({
	standalone: true,
	imports: [ BookmarkComponent, AsyncPipe, PortalComponent, ModalComponent, BookmarkEditContainer, GlyphDirective ],
	selector: 'app-bookmarks-container',
	templateUrl: './bookmarks.container.html',
	host: { 'class': 'comp p-4' }
})
export class BookmarksContainer extends BaseComponent {

	private store: Store = inject(Store);

	protected formVisible = this.store.selectSignal(selBookmark_formVisible);
	protected isShaking$ = this.store.select(selBookmark_shaking);

	protected bookmarks$: Observable<ClickedBookmark[]>;
	protected count$: Observable<number>;

	constructor() {

		super();
		this.bookmarks$ = this.store.select(selBM_filteredBookmarks).pipe(
			map(bookmarks => bookmarks.sort((b1, b2) => b2.clicks - b1.clicks))
		);
		this.count$ = this.store.select(selBookmark_EntityCount);

	}

	onEdit(id: UUID): void {

		this.store.dispatch(bookmarkActions.openEditDialog({ id }));

	}

	onPopular(id: UUID): void {

		this.store.dispatch(bookmarkActions.togglePopularTag({ id }));

	}

	onLinkClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

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
