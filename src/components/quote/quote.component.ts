import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { UUID } from 'lib/constants';
import { ClickedBookmark } from 'lib/models';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './quote.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent {

	bookmark = input.required<ClickedBookmark>();
	showDetails = input(false);
	editable = input(true);
	popularButton = input(true);
	disabled = input(false);

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
