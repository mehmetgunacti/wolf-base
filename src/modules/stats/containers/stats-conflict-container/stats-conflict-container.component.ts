import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Entity, RemoteData, RemoteMetadata, SyncData, UUID } from 'lib';
import { Observable } from 'rxjs';
import { downloadRemoteData, overrideLocalItem, overrideRemoteItem, purgeLocalItem, purgeRemoteItem } from 'store/actions/stats-bookmark.actions';
import { selStatsSelectedConflict, selStatsSelectedItem, selStatsSelectedRemoteData, selStatsSelectedRemoteMetadata, selStatsSelectedTrashItem } from 'store/selectors/stats.selectors';

@Component({
	selector: 'app-stats-conflict-container',
	templateUrl: './stats-conflict-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsConflictContainerComponent {

	private store: Store = inject(Store);

	syncData$: Observable<SyncData | null>;
	entity$: Observable<Entity | null>;
	trashItem$: Observable<Entity | null>;
	remoteData$: Observable<RemoteData<Entity> | null>;
	remoteMetadata$: Observable<RemoteMetadata | null>;

	constructor() {

		this.syncData$ = this.store.select(selStatsSelectedConflict);
		this.entity$ = this.store.select(selStatsSelectedItem);
		this.trashItem$ = this.store.select(selStatsSelectedTrashItem);
		this.remoteData$ = this.store.select(selStatsSelectedRemoteData);
		this.remoteMetadata$ = this.store.select(selStatsSelectedRemoteMetadata);

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