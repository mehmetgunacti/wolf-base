import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CloudTask, CloudTaskType, WolfEntity } from 'lib';

function toAction(type: CloudTaskType): 'upload' | 'download' | 'view' {

	switch (type) {

		case CloudTaskType.local_new:
		case CloudTaskType.local_updated:
		case CloudTaskType.local_deleted:
		case CloudTaskType.clicked:
			return 'upload';

		case CloudTaskType.remote_new:
		case CloudTaskType.remote_updated:
		case CloudTaskType.remote_deleted:
		case CloudTaskType.deleted_deleted:
			return 'download';

		case CloudTaskType.updated_updated:
		case CloudTaskType.updated_deleted:
		case CloudTaskType.deleted_updated:
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

	WolfEntity = WolfEntity;
	CloudTaskType = CloudTaskType;
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
