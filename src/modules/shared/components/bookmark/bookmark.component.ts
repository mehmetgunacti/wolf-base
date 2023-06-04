import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark, UUID } from 'lib';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {

	@Input() item: Bookmark | null | undefined;
	@Input() showDetails: boolean = false;
	@Input() compact: boolean = false;
	@Input() editable: boolean = true;
	@Input() popularButton: boolean = true;

	@Output() edit: EventEmitter<UUID> = new EventEmitter();
	@Output() popular: EventEmitter<UUID> = new EventEmitter();
	@Output() linkClick: EventEmitter<UUID> = new EventEmitter();

	onEdit(): void {

		if (this.item)
			this.edit.emit(this.item.id);

	}

	onLinkClick(): void {

		if (this.item)
			this.linkClick.emit(this.item.id);

	}

	onPopular(): void {

		if (this.item)
			this.popular.emit(this.item.id);

	}

}
