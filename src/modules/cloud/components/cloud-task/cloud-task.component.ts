import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CloudTask, CloudTaskType, WolfEntity } from 'lib';

@Component({
	selector: 'app-cloud-task',
	templateUrl: './cloud-task.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudTaskComponent {

	WolfEntity = WolfEntity;
	CloudTaskType = CloudTaskType;

	@Input({ required: true }) task!: CloudTask;

	@Output() action: EventEmitter<void> = new EventEmitter();

	onActionClicked(): void {

		this.action.emit();

	}

}