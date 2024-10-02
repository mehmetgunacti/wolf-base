import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { Learning, TaskCategoryLabels, TaskQueryParams, TaskStateLabels, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { taskActions } from 'store/actions';
import { selLearning_selected } from 'store/selectors/learning/learning-ui.selectors';
import { selTask_queryParams } from 'store/selectors/task/task-ui.selectors';

function formatQueryParams(queryParams: TaskQueryParams): string {

	const { search, status, category, tags } = queryParams;
	const statusText = `[Status: '${status === 'all' ? 'All' : TaskStateLabels[status]}']`;
	const categoryText = `[Category: '${category === 'all' ? 'All' : TaskCategoryLabels[category]}']`;
	const searchText = search ? `, [Search: '${search}']` : '';
	const tagsText = tags.length > 0 ? `, [Tags: (${tags.join(', ')})]` : '';
	return `${statusText}, ${categoryText}${searchText}${tagsText}`;

}

@Component({
	selector: 'app-learning-container',
	templateUrl: './learning-container.component.html',
	styleUrls: ['./learning-container.component.scss'],
	host: { 'class': 'd-flex-column gap-sm' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningContainerComponent {

	private store: Store = inject(Store);
	private queryParams: Signal<TaskQueryParams>;

	protected learningExpanded = signal<boolean>(false);
	protected tasksExpanded = signal<Record<UUID, boolean>>({});

	protected learning: Signal<Learning | null>;
	protected paramsText = computed(() => formatQueryParams(this.queryParams()));
	protected lengthText = computed(() => this.learning()?.tasks.length ?? 0);

	constructor() {

		this.learning = this.store.selectSignal(selLearning_selected);
		this.queryParams = this.store.selectSignal(selTask_queryParams);

	}

	protected onToggleInfo(): void {

		this.learningExpanded.update(e => e = !e);

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
