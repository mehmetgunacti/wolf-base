import { WolfEntity } from "lib/constants";

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
type CloudTaskColor = 'success' | 'warning' | 'danger';
type CloudTaskAction = 'upload' | 'download' | 'view';

export interface CloudTask {

	count: number;
	entity: WolfEntity;
	type: CloudTaskType;
	color: CloudTaskColor;
	action: CloudTaskAction;

}

export function toCloudTask(count: number, entity: WolfEntity, type: CloudTaskType, color: CloudTaskColor, action: CloudTaskAction): CloudTask {

	return { count, entity, type, color, action };

}
