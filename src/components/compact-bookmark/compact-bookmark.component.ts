import { Component, input, output } from '@angular/core';
import { UUID } from '@constants/common.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { ClickedBookmark } from '@models/bookmark.model';

@Component({
	selector: 'app-compact-bookmark',
	imports: [ GlyphDirective ],
	templateUrl: './compact-bookmark.component.html',
	host: {
		'class': 'inline-block comp comp-hover comp-active',
		'(click)': 'onLinkClick()'
	}
})
export class CompactBookmarkComponent extends BaseComponent {

	// Input
	bookmark = input.required<ClickedBookmark>();

	// Output
	linkClick = output<UUID>();

	onLinkClick(): void {

		if (this.bookmark())
			this.linkClick.emit(this.bookmark().id);

	}

}
