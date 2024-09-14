import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UUID } from 'lib/constants';
import { ClickedBookmark } from 'lib/models';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	styleUrls: ['./bookmark.component.scss'],
	host: { 'class': 'box shadow hover' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {

	@Input() bookmark: ClickedBookmark | null | undefined;
	@Input() showDetails = false;
	@Input() editable = true;
	@Input() popularButton = true;
	@Input() disabled = false;

	@Output() edit: EventEmitter<UUID> = new EventEmitter();
	@Output() popular: EventEmitter<UUID> = new EventEmitter();
	@Output() linkClick: EventEmitter<UUID> = new EventEmitter();

	onEdit(): void {

		if (this.bookmark)
			this.edit.emit(this.bookmark.id);

	}

	onLinkClick(): void {

		if (this.bookmark)
			this.linkClick.emit(this.bookmark.id);

	}

	onPopular(): void {

		if (this.bookmark)
			this.popular.emit(this.bookmark.id);

	}

}
