import { bookmarkActions } from '@actions';
import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GlyphDirective } from '@directives';
import { BaseComponent, ModalComponent, PortalComponent } from '@libComponents';
import { Store } from '@ngrx/store';
import { selBookmark_shaking } from '@selectors';
import { BookmarkEditContainer } from 'containers/bookmark-edit/bookmark-edit.container';
import { BookmarksContainer } from 'containers/bookmarks-container/bookmarks-container.component';
import { BookmarksSearchAndTagCloudContainer } from 'containers/search-and-tag-cloud-container/bookmarks-search-and-tag-cloud-container.component';
import { Observable } from 'rxjs';

@Component({
	selector: 'bookmarks-page',
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, AsyncPipe, ModalComponent, BookmarkEditContainer, BookmarksSearchAndTagCloudContainer, BookmarksContainer ],
	template: `
		<w-portal>

			<button
				class="link"
				(click)="fromClipboard()"
				[class.shake]="isShaking$ | async"
				title="Create from copied URL">
				<svg wGlyph="content_paste"></svg>Clipboard
			</button>

			<button
				class="link"
				(click)="openAddDialog()">
				<svg wGlyph="bookmark_add"></svg> Bookmark
			</button>

			<button (click)="open()">Open</button>

			</w-portal>

			@if (showNew()) {

			<w-modal (close)="close()">
				<app-bookmark-edit-container/>
			</w-modal>

			}

			<!-- Search and Tag-cloud -->
			<app-bookmarks-search-and-tag-cloud-container/>

			<!-- Bookmarks list -->
			<app-bookmarks-container/>
	`,
	host: { 'class': 'page' }
})
export class BookmarksPage extends BaseComponent {

	isShaking$: Observable<boolean>;
	showNew = signal(false);

	private store: Store = inject(Store);

	constructor() {

		super();
		this.isShaking$ = this.store.select(selBookmark_shaking);

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
