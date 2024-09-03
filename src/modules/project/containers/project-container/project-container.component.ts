import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { Project, TaskCategoryLabels, TaskQueryParams, TaskStateLabels, UUID } from '@lib';
import { Store } from '@ngrx/store';
import * as taskActions from 'store/actions/project-task.actions';
import { selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';
import { selTask_queryParams } from 'store/selectors/task-selectors/task-ui.selectors';

function formatQueryParams(queryParams: TaskQueryParams): string {

	const { search, status, category, tags } = queryParams;
	const statusText = `[Status: '${status === 'all' ? 'All' : TaskStateLabels[status]}']`;
	const categoryText = `[Category: '${category === 'all' ? 'All' : TaskCategoryLabels[category]}']`;
	const searchText = search ? `, [Search: '${search}']` : '';
	const tagsText = tags.length > 0 ? `, [Tags: (${tags.join(', ')})]` : '';
	return `${statusText}, ${categoryText}${searchText}${tagsText}`;

}

@Component({
	selector: 'app-project-container',
	templateUrl: './project-container.component.html',
	styleUrls: ['./project-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContainerComponent {

	private store: Store = inject(Store);
	private queryParams: Signal<TaskQueryParams>;

	protected projectExpanded = signal<boolean>(false);
	protected tasksExpanded = signal<Record<UUID, boolean>>({});

	protected project: Signal<Project | null>;
	protected paramsText = computed(() => formatQueryParams(this.queryParams()));
	protected lengthText = computed(() => this.project()?.tasks.length ?? 0);

	constructor() {

		this.project = this.store.selectSignal(selProject_selected);
		this.queryParams = this.store.selectSignal(selTask_queryParams);

	}

	protected onToggleInfo(): void {

		this.projectExpanded.update(e => e = !e);

	}

	protected onOpenNewTaskDialog(): void {

		this.store.dispatch(taskActions.openAddTaskDialog());

	}

	protected onOpenEditTaskDialog(id: UUID): void {

		this.store.dispatch(taskActions.openEditTaskDialog({ id }));

	}

	protected onToggleTask(id: UUID): void {

		this.tasksExpanded.update(map => { map[id] = !map[id]; return map; });

	}

}
