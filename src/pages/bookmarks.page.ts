import { bookmarkActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookmarkEditContainer, BookmarksContainer, BookmarksSearchAndTagCloudContainer } from '@containers';
import { GlyphDirective } from '@directives';
import { BaseComponent, ModalComponent, PortalComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selBookmark_formVisible, selBookmark_shaking } from '@selectors';

@Component({
	selector: 'bookmarks-page',
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, AsyncPipe, ModalComponent, BookmarkEditContainer, BookmarksSearchAndTagCloudContainer, BookmarksContainer ],
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


		<app-bookmarks-container/>
	`,
	host: { 'class': 'page' }
})
// <app-bookmarks-search-and-tag-cloud-container/>
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
