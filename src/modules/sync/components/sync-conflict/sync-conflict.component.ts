import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, RemoteData, SyncData, UUID } from 'lib';

@Component({
	selector: 'app-sync-conflict',
	templateUrl: './sync-conflict.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncConflictComponent {

	@Input() syncData: SyncData | undefined | null;
	@Input() entity: Entity | undefined | null;
	@Input() trashItem: Entity | undefined | null;
	@Input() remoteData: RemoteData<Entity> | undefined | null;

	@Output() deleteLocal = new EventEmitter<UUID>();
	@Output() deleteRemote = new EventEmitter<UUID>();
	@Output() overrideLocal = new EventEmitter<RemoteData<Entity>>();
	@Output() overrideRemote = new EventEmitter<Entity>();
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
			this.overrideLocal.emit(this.remoteData);

	}

	onOverrideRemote(): void {

		if (this.entity)
			this.overrideRemote.emit(this.entity);

	}

	onLoadRemote(): void {

		if (this.syncData)
			this.loadRemote.emit(this.syncData.id);

	}

}