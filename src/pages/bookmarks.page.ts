import { bookmarkActions } from '@actions/bookmark.actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookmarkEditContainer } from '@containers/bookmark-edit/bookmark-edit.container';
import { BookmarksSearchAndTagCloudContainer } from '@containers/bookmarks-search-and-tag-cloud/bookmarks-search-and-tag-cloud.container';
import { BookmarksContainer } from '@containers/bookmarks/bookmarks.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ModalComponent } from '@libComponents/modal/modal.component';
import { PortalComponent } from '@libComponents/portal.component';
import { Store } from '@ngrx/store';
import { selBookmark_formVisible, selBookmark_shaking } from '@selectors/bookmark/bookmark-ui.selectors';
import { SearchBoxComponent } from "../lib/components/search-box/search-box.component";

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, AsyncPipe, ModalComponent, BookmarkEditContainer, BookmarksSearchAndTagCloudContainer, BookmarksContainer, SearchBoxComponent ],
	selector: 'bookmarks-page',
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				(click)="fromClipboard()"
				[class.shake]="isShaking$ | async"
				title="Create from copied URL">
				<svg wGlyph="content_paste"></svg>Clipboard
			</button>
			<button
				class="btn btn-ghost"
				(click)="openFormDialog()">
				<svg wGlyph="bookmark_add"></svg> Bookmark
			</button>

		</w-portal>

		@if (formVisible()) {

			<w-modal (close)="closeFormDialog()">
				<app-bookmark-edit-container/>
			</w-modal>

		}

		<app-bookmarks-search-and-tag-cloud-container/>
		<w-search-box/>
		<app-bookmarks-container/>
	`,
	host: { 'class': 'page' }
})
export class BookmarksPage extends BaseComponent {

	private store: Store = inject(Store);

	protected isShaking$ = this.store.select(selBookmark_shaking);
	protected formVisible = this.store.selectSignal(selBookmark_formVisible);

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
