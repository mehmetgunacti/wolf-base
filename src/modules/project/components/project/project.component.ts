import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { Project, ProjectStatusLabels, slideDownTrigger, Task, TaskPriorityLabels, UUID } from '@lib';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	animations: [slideDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {

	protected ProjectStatusLabels = ProjectStatusLabels;
	protected TaskPriorityLabels = TaskPriorityLabels;

	project: InputSignal<Project> = input.required();
	taskGroupMap: InputSignal<Record<UUID, Task[]>> = input.required();
	infoVisible: InputSignal<boolean> = input(false);

	toggleInfo = output<boolean>();
	newTask = output<UUID>();

	onToggle(): void {

		this.toggleInfo.emit(!this.infoVisible());

	}

	onNewTask(taskGroupId: UUID): void {

		this.newTask.emit(taskGroupId);

	}

	onOpenTask(id: UUID): void {



	}

}
