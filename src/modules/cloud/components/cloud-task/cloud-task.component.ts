import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CloudTask, SyncTaskType, EntityType } from 'lib';

function toAction(type: SyncTaskType): 'upload' | 'download' | 'view' {

	switch (type) {

		case SyncTaskType.local_new:
		case SyncTaskType.local_updated:
		case SyncTaskType.local_deleted:
		case SyncTaskType.clicked:
			return 'upload';

		case SyncTaskType.remote_new:
		case SyncTaskType.remote_updated:
		case SyncTaskType.remote_deleted:
		case SyncTaskType.deleted_deleted:
			return 'download';

		case SyncTaskType.updated_updated:
		case SyncTaskType.updated_deleted:
		case SyncTaskType.deleted_updated:
			return 'view';

	}

}

@Component({
	selector: 'app-cloud-task',
	templateUrl: './cloud-task.component.html',
	styleUrls: ['./cloud-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudTaskComponent {

	EntityType = EntityType;
	CloudTaskType = SyncTaskType;
	task!: CloudTask;
	actionType!: 'upload' | 'download' | 'view';

	@Input({ required: true, alias: 'task' }) set _task(task: CloudTask) {

		this.task = task;
		this.actionType = toAction(task.type);

	}

	@Output() action: EventEmitter<CloudTask> = new EventEmitter();

	onActionClicked(): void {

		this.action.emit(this.task);

	}

}
