import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompactBookmarkComponent } from '@components/compact-bookmark/compact-bookmark.component';
import { TAG_POPULAR, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { ClickedBookmark } from '@models';


@Component({
	standalone: true,
	imports: [ RouterModule, GlyphDirective, CompactBookmarkComponent ],
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	host: { 'class': 'relative flex min-h-20 group/bookmark bg-accent rounded-lg' }
})
export class BookmarkComponent extends BaseComponent {

	TAG_POPULAR = TAG_POPULAR;

	// Input
	bookmark = input.required<ClickedBookmark>();
	showDetails = input(false);
	editable = input(true);
	popularButton = input(true);
	disabled = input(false);

	// Output
	edit = output<UUID>();
	popular = output<UUID>();
	linkClick = output<UUID>();

	onEdit(): void {

		if (this.bookmark())
			this.edit.emit(this.bookmark().id);

	}

	onLinkClick(): void {

		if (this.bookmark())
			this.linkClick.emit(this.bookmark().id);

	}

	onPopular(): void {

		if (this.bookmark())
			this.popular.emit(this.bookmark().id);

	}

}
