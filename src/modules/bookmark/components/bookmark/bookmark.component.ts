import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark, PLACEHOLDER_QUESTIONMARK, UUID } from 'lib';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {

	PLACEHOLDER_QUESTIONMARK = PLACEHOLDER_QUESTIONMARK;

	@Input() item: Bookmark | null | undefined;
	@Input() showDetails: boolean = false;

	@Output() edit: EventEmitter<UUID> = new EventEmitter();
	@Output() linkClick: EventEmitter<Bookmark> = new EventEmitter();


	onEdit(): void {

		if (this.item)
			this.edit.emit(this.item.id);

	}

	onLinkClick(): void {

		if (this.item)
			this.linkClick.emit(this.item);

	}

}
