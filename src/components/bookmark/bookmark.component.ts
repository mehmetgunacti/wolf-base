import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlyphDirective } from '@directive';
import { BaseComponent } from '@libComponents';
import { UUID } from 'lib/constants';
import { ClickedBookmark } from 'lib/models';

@Component({
	selector: 'app-bookmark',
	standalone: true,
	imports: [ RouterModule, GlyphDirective ],
	templateUrl: './bookmark.component.html',
	styleUrls: [ './bookmark.component.scss' ],
	host: {
		'class': 'comp comp-hover rounded-lg'
	}
})
export class BookmarkComponent extends BaseComponent {

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
