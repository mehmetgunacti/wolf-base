import { Component, input, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { slideDownEnterLeaveTrigger, slideDownTrigger, slideUpDownTrigger } from '@animations/slide-in-out.animation';
import { CompactBookmarkComponent } from '@components/compact-bookmark/compact-bookmark.component';
import { TAG_POPULAR } from '@constants/bookmark.constant';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ClickedBookmark } from '@models/bookmark.model';

@Component({
	imports: [ RouterModule, GlyphDirective, CompactBookmarkComponent ],
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	animations: [ slideDownEnterLeaveTrigger, slideDownTrigger, slideUpDownTrigger ],
	host: { 'class': 'flex flex-col bg-form-element rounded-lg' }
})
export class BookmarkComponent extends BaseComponent {

	TAG_POPULAR = TAG_POPULAR;

	// Input
	bookmark = input.required<ClickedBookmark>();
	showDetails = input(false);
	editable = input(true);
	popularButton = input(true);
	disabled = input(false);
	detailed = input(true);

	// Output
	edit = output<UUID>();
	popular = output<UUID>();
	linkClick = output<UUID>();
	tagClick = output<string>();

	onEdit(): void {

		if (this.bookmark())
			this.edit.emit(this.bookmark().id);

	}

	onLinkClick(id: UUID): void {

		this.linkClick.emit(id);

	}

	onTagClicked(name: string): void {

		this.tagClick.emit(name);

	}

	onPopular(): void {

		if (this.bookmark())
			this.popular.emit(this.bookmark().id);

	}

}
