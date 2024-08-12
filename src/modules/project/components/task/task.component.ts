import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Task, TaskPriorityLabels, TaskStateLabels } from 'lib';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

	TASK_STATE = TaskStateLabels;
	TASK_PRIORITIES = TaskPriorityLabels;

	/* @Input() */
	task = input.required<Task>();

}
