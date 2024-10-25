import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlyphComponent } from 'lib/components/glyph/glyph.component';
import { UUID } from 'lib/constants';
import { ClickedBookmark } from 'lib/models';

@Component({
	selector: 'app-compact-bookmark',
	standalone: true,
	imports: [RouterModule, GlyphComponent],
	templateUrl: './compact-bookmark.component.html',
	styleUrls: ['./compact-bookmark.component.scss'],
	host: {
		'class': 'comp comp-hover rounded-lg'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompactBookmarkComponent {

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
