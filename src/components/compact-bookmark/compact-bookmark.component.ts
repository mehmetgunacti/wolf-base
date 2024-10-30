import { Component, input, output } from '@angular/core';
import { GlyphDirective } from '@directive';
import { BaseComponent } from '@libComponents';
import { UUID } from 'lib/constants';
import { ClickedBookmark } from 'lib/models';

@Component({
	selector: 'app-compact-bookmark',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './compact-bookmark.component.html',
	host: { 'class': 'comp comp-hover comp-active' }
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
