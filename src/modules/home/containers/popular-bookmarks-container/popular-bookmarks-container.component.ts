import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClickedBookmark, TAG_POPULAR, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { GlyphComponent } from 'lib/components/glyph/glyph.component';
import { BookmarkComponent } from 'modules/shared/bookmark/bookmark.component';
import { Observable, map } from 'rxjs';
import { bookmarkActions } from 'store/actions';
import * as bmSelectors from 'store/selectors/bookmark/bookmark-clicks.selectors';
import * as coreSelectors from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-popular-bookmarks-container',
	standalone: true,
	imports: [CommonModule, RouterModule, GlyphComponent, BookmarkComponent],
	templateUrl: './popular-bookmarks-container.component.html',
	styleUrls: ['./popular-bookmarks-container.component.scss'],
	host: {
		'class': 'd-flex-col'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBookmarksContainerComponent implements OnInit {

	bookmarks$: Observable<ClickedBookmark[]>;
	tags$: Observable<string[]>;

	private store: Store = inject(Store);

	constructor() {

		this.bookmarks$ = this.store.select(bmSelectors.selBookmark_array).pipe(
			map(bookmarks => bookmarks.filter(b => b.tags.includes(TAG_POPULAR))),
			map(bookmarks => bookmarks.sort((b1, b2) => b2.clicks - b1.clicks))
		);
		this.tags$ = this.store.select(coreSelectors.selCore_popularBookmarks);

	}

	ngOnInit(): void {



	}

	onRefresh(): void {

		// this.store.dispatch(
		// 	actions.loadEntities({
		// 		entity: Entities.bookmarks,
		// 		skipCache: true
		// 	})
		// );

	}

	onClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

	}

}
