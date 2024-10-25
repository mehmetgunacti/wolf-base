import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompactBookmarkComponent } from '@components';
import { UUID } from '@constants';
import { Store } from '@ngrx/store';
import { GlyphComponent } from 'lib/components/glyph/glyph.component';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { bookmarkActions } from 'store/actions';
import * as bmSelectors from 'store/selectors/bookmark/bookmark-clicks.selectors';
import * as coreSelectors from 'store/selectors/core/core-configuration.selectors';

@Component({
	selector: 'app-popular-bookmarks-container',
	standalone: true,
	imports: [ CommonModule, RouterModule, GlyphComponent, CompactBookmarkComponent, GlyphDirective ],
	templateUrl: './popular-bookmarks-container.component.html',
	styleUrls: [ './popular-bookmarks-container.component.scss' ],
	host: {
		'class': 'flex flex-col gap-1 md:gap-2 @container'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBookmarksContainerComponent {

	private store: Store = inject(Store);
	tags = this.store.selectSignal(coreSelectors.selCore_popularBookmarks);
	bookmarks = this.store.selectSignal(bmSelectors.selBookmark_popular);

	onClick(id: UUID): void {

		this.store.dispatch(bookmarkActions.click({ id }));

	}

}
