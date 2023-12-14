import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UUID } from 'lib/constants';
import { Note } from 'lib/models';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['./note.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {

	@Input() item: Note | null | undefined;
	@Input() showDetails = false;
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
