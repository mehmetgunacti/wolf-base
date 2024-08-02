import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Project, Task, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as taskActions from 'store/actions/project-task.actions';
import * as projectActions from 'store/actions/project.actions';
import { selProject_infoVisible, selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';
import { selTask_taskGroupMap } from 'store/selectors/project-task-selectors/task-ui.selectors';

@Component({
	selector: 'app-project-container',
	templateUrl: './project-container.component.html',
	styleUrls: ['./project-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {

	private store: Store = inject(Store);

	project$: Observable<Project | null>;
	taskGroupMap: Signal<Record<UUID, Task[]>>;
	infoVisible: Signal<boolean>;

	constructor() {

		this.project$ = this.store.select(selProject_selected);
		this.taskGroupMap = this.store.selectSignal(selTask_taskGroupMap);
		this.infoVisible = this.store.selectSignal(selProject_infoVisible);

	}

	onToggleInfo(): void {

		this.store.dispatch(projectActions.toggleInfo());

	}

	onOpenNewTaskDialog(taskGroupId: UUID): void {

		this.store.dispatch(taskActions.openAddTaskDialog({ taskGroupId }));

	}

}
