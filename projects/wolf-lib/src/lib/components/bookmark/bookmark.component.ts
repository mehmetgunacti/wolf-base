import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UUID } from 'lib/constants';
import { Bookmark } from 'lib/models';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent {

	@Input() item: Bookmark | null | undefined;
	@Input() showDetails = false;
	@Input() compact = false;
	@Input() editable = true;
	@Input() popularButton = true;
	@Input() disabled = false;

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
