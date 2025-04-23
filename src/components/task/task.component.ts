import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { slideDownTrigger } from '@animations/slide-in-out.animation';
import { UUID } from '@constants/common.constant';
import { TaskCategoryLabels, TaskPriority, TaskPriorityLabels, TaskState, TaskStateLabels } from '@constants/project.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { Task } from '@models/project.model';
import { MarkdownViewerComponent } from "../../lib/components/markdown/markdown-viewer.component";

@Component({
	imports: [GlyphDirective, DatePipe, MarkdownViewerComponent],
	selector: 'app-task',
	templateUrl: './task.component.html',
	animations: [ slideDownTrigger ],
	host: {
		'class': 'flex flex-col'
	}
})
export class TaskComponent extends BaseComponent {

	TASK_PRIORITIES_LABELS = TaskPriorityLabels;
	TASK_CATEGORIES_LABELS = TaskCategoryLabels;
	TASK_STATE_LABELS = TaskStateLabels;

	TaskState = TaskState;
	TaskPriority = TaskPriority;

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
