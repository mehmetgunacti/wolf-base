import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Bookmark, UUID, PLACEHOLDER_QUESTIONMARK } from 'lib';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkComponent implements OnInit, OnChanges {

	PLACEHOLDER_QUESTIONMARK = PLACEHOLDER_QUESTIONMARK;

	@Input() item: Bookmark | null | undefined;
	@Input() showDetails: boolean = false;

	@Output() edit: EventEmitter<UUID> = new EventEmitter();
	@Output() linkClick: EventEmitter<Bookmark> = new EventEmitter();


	ngOnInit(): void {
		console.log(this.item);
	}
	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}

	onEdit(): void {

		if (this.item)
			this.edit.emit(this.item.id);

	}

	onLinkClick(): void {

		if (this.item)
			this.linkClick.emit(this.item);

	}

}
