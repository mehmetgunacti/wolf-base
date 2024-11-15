import { UUID } from '@constants/common.constant';
import { NameBase } from '@models/id-base.model';
import { RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';

// LOCAL NEW
export function listOf_LocalNew(entities: NameBase[], syncDataMap: Record<UUID, SyncData>): NameBase[] {

	return entities.filter(e => !syncDataMap[ e.id ]);

}

// LOCAL UPDATED
export function listOf_LocalUpdated(entities: NameBase[], updatedEntityIds: UUID[]): NameBase[] {

	return entities.filter(e => updatedEntityIds.includes(e.id));

}

// LOCAL DELETED
export function listOf_LocalDeleted(syncData: SyncData[], deletedEntityIds: UUID[]): NameBase[] {

	return syncData.filter(e => deletedEntityIds.includes(e.id));

}

// REMOTE NEW
export function listOf_RemoteNew(remote: RemoteMetadata[], local: Record<UUID, SyncData>): NameBase[] {

	return remote.filter(r => !local[ r.id ]);

}

// REMOTE UPDATED
export function listOf_RemoteUpdated(remote: RemoteMetadata[], local: Record<UUID, SyncData>): NameBase[] {

	return remote.filter(

		r => local[ r.id ] && !local[ r.id ].deleted && !local[ r.id ].updated && local[ r.id ].updateTime !== r.updateTime

	);

}

// REMOTE DELETED
export function listOf_RemoteDeleted(remoteMetadataMap: Record<UUID, RemoteMetadata>, syncDataList: SyncData[]): NameBase[] {

	return syncDataList.filter(

		sd => !sd.updated && !sd.deleted && !remoteMetadataMap[ sd.id ]

	);

}

// LOCAL UPDATED REMOTE UPDATED
export function listOf_LocalUpdatedRemoteUpdated(local: SyncData[], remote: Record<UUID, RemoteMetadata>): NameBase[] {

	return local.filter(

		sd => !sd.deleted && sd.updated && remote[ sd.id ] && remote[ sd.id ].updateTime !== sd.updateTime

	);

}

// LOCAL DELETED REMOTE DELETED
export function listOf_LocalDeletedRemoteDeleted(syncData: SyncData[], remote: Record<string, RemoteMetadata>): NameBase[] {

	return syncData.filter(

		sd => sd.deleted && !remote[ sd.id ]

	);

}

// LOCAL UPDATED REMOTE DELETED
export function listOf_LocalUpdatedRemoteDeleted(local: SyncData[], remote: Record<string, RemoteMetadata>): NameBase[] {

	return local.filter(

		sd => sd.updated && !remote[ sd.id ]

	);

}

// LOCAL DELETED REMOTE UPDATED
export function listOf_LocalDeletedRemoteUpdated(local: SyncData[], remote: Record<UUID, RemoteMetadata>): NameBase[] {

	return local.filter(

		sd => sd.deleted && remote[ sd.id ] && remote[ sd.id ].updateTime !== sd.updateTime

	);

}

// LOCAL UPDATED IDs
export function listOf_LocalUpdatedIds(syncData: SyncData[], remote: Record<string, RemoteMetadata>): UUID[] {

	return syncData.filter(

		s => s.updated && !s.deleted && remote[ s.id ] && s.updateTime === remote[ s.id ].updateTime

	).map(s => s.id);

}

// LOCAL DELETED IDs
export function listOf_LocalDeletedIds(syncData: SyncData[], remote: Record<string, RemoteMetadata>): UUID[] {

	return syncData.filter(

		s => s.deleted && remote[ s.id ] && s.updateTime === remote[ s.id ].updateTime

	).map(s => s.id);

}

// REMOTE UPDATED IDs
export function listOf_RemoteUpdatedIds(remote: RemoteMetadata[], local: Record<UUID, SyncData>): NameBase[] {

	return remote.filter(

		r => local[ r.id ] && !local[ r.id ].deleted && !local[ r.id ].updated && local[ r.id ].updateTime !== r.updateTime

	);

}

// SYNC DATA MAP
export function mapOf_SyncData(arr: SyncData[]): Record<UUID, SyncData> {

	return arr.reduce(
		(acc, syncData) => {

			acc[ syncData.id ] = syncData;
			return acc;

		},
		{} as Record<UUID, SyncData>
	);

}

// REMOTE METADATA MAP
export function mapOf_RemoteMetadata(arr: RemoteMetadata[]): Record<UUID, RemoteMetadata> {

	return arr.reduce(

		(acc, metadata) => {

			acc[ metadata.id ] = metadata;
			return acc;

		},
		{} as Record<UUID, RemoteMetadata>

	);

}
