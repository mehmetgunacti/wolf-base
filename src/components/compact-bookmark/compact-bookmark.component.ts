import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { UUID } from 'lib/constants';
import { ClickedBookmark } from 'lib/models';

@Component({
	selector: 'app-compact-bookmark',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './compact-bookmark.component.html',
	host: { 'class': 'block comp-hover comp' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompactBookmarkComponent {

	// Input
	bookmark = input.required<ClickedBookmark>();

	// Output
	linkClick = output<UUID>();

	onLinkClick(): void {

		if (this.bookmark())
			this.linkClick.emit(this.bookmark().id);

	}

}
