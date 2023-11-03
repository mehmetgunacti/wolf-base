import { WolfEntity } from "lib/constants";
import { Entity } from './entity.model';

export enum CloudTaskType {

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
type CloudTaskAction = 'upload' | 'download' | 'view';

export interface CloudTask {

	entities: Entity[],
	entity: WolfEntity;
	type: CloudTaskType;
	action: CloudTaskAction;

}

export function createCloudTask(entities: Entity[], entity: WolfEntity, type: CloudTaskType, action: CloudTaskAction): CloudTask {

	return { entities, entity, type, action };

}
