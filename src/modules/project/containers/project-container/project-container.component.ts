import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { Project, UUID } from '@lib';
import { Store } from '@ngrx/store';
import * as taskActions from 'store/actions/project-task.actions';
import { selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';

@Component({
	selector: 'app-project-container',
	templateUrl: './project-container.component.html',
	styleUrls: ['./project-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {

	private store: Store = inject(Store);

	protected projectExpanded = signal<boolean>(false);
	protected tasksExpanded = signal<Record<UUID, boolean>>({});

	project: Signal<Project | null>;

	constructor() {

		this.project = this.store.selectSignal(selProject_selected);

	}

	onToggleInfo(): void {

		this.projectExpanded.update(e => e = !e);

	}

	onOpenNewTaskDialog(): void {

		this.store.dispatch(taskActions.openAddTaskDialog());

	}

	onOpenEditTaskDialog(id: UUID): void {

		this.store.dispatch(taskActions.openEditTaskDialog({ id }));

	}

	onToggleTask(id: UUID): void {

		this.tasksExpanded.update(map => { map[id] = !map[id]; return map; });

	}

}
