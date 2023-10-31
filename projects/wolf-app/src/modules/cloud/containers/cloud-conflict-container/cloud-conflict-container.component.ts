import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Entity, RemoteData, RemoteMetadata, SyncData, UUID } from 'lib';
import { Observable } from 'rxjs';
import { downloadRemoteData, overrideLocalItem, overrideRemoteItem, purgeLocalItem, purgeRemoteItem } from 'store/actions/cloud-bookmark.actions';
import { selCloudSelectedConflict, selCloudSelectedItem, selCloudSelectedRemoteData, selCloudSelectedRemoteMetadata, selCloudSelectedTrashItem } from 'store/selectors/cloud.selectors';

@Component({
	selector: 'app-cloud-conflict-container',
	templateUrl: './cloud-conflict-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudConflictContainerComponent {

	private store: Store = inject(Store);

	syncData$: Observable<SyncData | null>;
	entity$: Observable<Entity | null>;
	trashItem$: Observable<Entity | null>;
	remoteData$: Observable<RemoteData<Entity> | null>;
	remoteMetadata$: Observable<RemoteMetadata | null>;

	constructor() {

		this.syncData$ = this.store.select(selCloudSelectedConflict);
		this.entity$ = this.store.select(selCloudSelectedItem);
		this.trashItem$ = this.store.select(selCloudSelectedTrashItem);
		this.remoteData$ = this.store.select(selCloudSelectedRemoteData);
		this.remoteMetadata$ = this.store.select(selCloudSelectedRemoteMetadata);

	}

	onDeleteLocal(id: UUID): void {

		this.store.dispatch(purgeLocalItem({ id }));

	}

	onDeleteRemote(id: UUID): void {

		this.store.dispatch(purgeRemoteItem({ id }));

	}

	onOverrideLocal(): void {

		this.store.dispatch(overrideLocalItem());

	}

	onOverrideRemote(): void {

		this.store.dispatch(overrideRemoteItem());

	}

	onLoadRemote(id: UUID): void {

		this.store.dispatch(downloadRemoteData({ id }));

	}

}