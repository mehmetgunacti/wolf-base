import { EntityType } from "lib/constants";
import { NameBase } from './id-base.model';

export enum SyncTaskType {

	local_new = 'local_new',
	local_updated = 'local_updated',
	local_deleted = 'local_deleted',

	remote_new = 'remote_new',
	remote_updated = 'remote_updated',
	remote_deleted = 'remote_deleted',

	updated_updated = 'updated_updated',
	deleted_deleted = 'deleted_deleted',
	updated_deleted = 'updated_deleted',
	deleted_updated = 'deleted_updated',

	clicked = 'clicked'

}

export interface CloudTask {

	items: NameBase[];
	entity: EntityType;
	type: SyncTaskType;

}

export function toCloudTask(items: NameBase[], entity: EntityType, type: SyncTaskType): CloudTask {

	return { items, entity, type };

}
