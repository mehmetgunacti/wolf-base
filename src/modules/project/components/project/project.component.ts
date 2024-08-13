import { ChangeDetectionStrategy, Component, input, InputSignal, output, signal } from '@angular/core';
import { Project, ProjectStatusLabels, slideDown, slideDownTrigger, Task, TaskPriorityLabels, UUID } from '@lib';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	animations: [slideDown],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {

	protected ProjectStatusLabels = ProjectStatusLabels;
	protected TaskPriorityLabels = TaskPriorityLabels;

	protected tasksExpanded = signal<Record<UUID, boolean>>({});

	// @Input
	project: InputSignal<Project> = input.required();
	infoVisible: InputSignal<boolean> = input(false);

	// @Output
	toggleInfo = output<boolean>();
	newTask = output<void>();
	viewTask = output<UUID>();

	onToggleInfo(): void {

		this.toggleInfo.emit(!this.infoVisible());

	}

	onToggleTask(id: UUID): void {

		this.tasksExpanded.update(map => { map[id] = !map[id]; return map; });

	}

	onNewTask(): void {

		this.newTask.emit();

	}

	onOpenTask(id: UUID): void {

		this.viewTask.emit(id);

	}

}
