import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Entity, RemoteData, SyncData, UUID } from 'lib';
import { Observable } from 'rxjs';
import { downloadRemoteData, overrideLocalItem, overrideRemoteItem, purgeLocalItem, purgeRemoteItem } from 'store/actions/sync.actions';
import { selectedConflict, selectedItem, selectedRemoteData, selectedTrashItem } from 'store/selectors/sync.selectors';

@Component({
	selector: 'app-sync-conflict-container',
	templateUrl: './sync-conflict-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyncConflictContainerComponent {

	private store: Store = inject(Store);

	syncData$: Observable<SyncData | null>;
	entity$: Observable<Entity | null>;
	trashItem$: Observable<Entity | null>;
	remoteData$: Observable<RemoteData<Entity> | null>;

	constructor() {

		this.syncData$ = this.store.select(selectedConflict);
		this.entity$ = this.store.select(selectedItem);
		this.trashItem$ = this.store.select(selectedTrashItem);
		this.remoteData$ = this.store.select(selectedRemoteData);

	}

	onDeleteLocal(id: UUID): void {

		this.store.dispatch(purgeLocalItem({ id }));

	}

	onDeleteRemote(id: UUID): void {

		this.store.dispatch(purgeRemoteItem({ id }));

	}

	onOverrideLocal(remoteData: RemoteData<Entity>): void {

		this.store.dispatch(overrideLocalItem({ remoteData }));

	}

	onOverrideRemote(entity: Entity): void {

		this.store.dispatch(overrideRemoteItem({ entity }));

	}

	onLoadRemote(id: UUID): void {

		this.store.dispatch(downloadRemoteData({ id }));

	}

}