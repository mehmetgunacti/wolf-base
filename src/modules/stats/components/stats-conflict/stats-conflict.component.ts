import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, RemoteData, RemoteMetadata, SyncData, UUID } from 'lib';

@Component({
	selector: 'app-stats-conflict',
	templateUrl: './stats-conflict.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsConflictComponent {

	@Input() syncData: SyncData | undefined | null;
	@Input() entity: Entity | undefined | null;
	@Input() trashItem: Entity | undefined | null;
	@Input() remoteData: RemoteData<Entity> | undefined | null;
	@Input() remoteMetadata: RemoteMetadata | undefined | null;

	@Output() deleteLocal = new EventEmitter<UUID>();
	@Output() deleteRemote = new EventEmitter<UUID>();
	@Output() overrideLocal = new EventEmitter<void>();
	@Output() overrideRemote = new EventEmitter<void>();
	@Output() loadRemote = new EventEmitter<UUID>();

	onDeleteLocal(): void {

		if (this.syncData)
			this.deleteLocal.emit(this.syncData.id);

	}

	onDeleteRemote(): void {

		if (this.syncData)
			this.deleteRemote.emit(this.syncData.id);

	}

	onOverrideLocal(): void {

		if (this.remoteData)
			this.overrideLocal.emit();

	}

	onOverrideRemote(): void {

		if (this.entity)
			this.overrideRemote.emit();

	}

	onLoadRemote(): void {

		if (this.syncData)
			this.loadRemote.emit(this.syncData.id);

	}

}