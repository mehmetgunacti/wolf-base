import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { slideDownTrigger, Task, TaskPriorityLabels, TaskStateLabels, UUID } from 'lib';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	animations: [slideDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

	TASK_STATE = TaskStateLabels;
	TASK_PRIORITIES = TaskPriorityLabels;

	/* @Input() */
	task = input.required<Task>();
	expanded = input.required<boolean>();

	// @Output
	editTask = output<UUID>();
	toggleTask = output<UUID>();

	onEditTask(id: UUID): void {

		this.editTask.emit(id);

	}

	onToggleTask(id: UUID): void {

		this.toggleTask.emit(id);

	}

}
