import { taskActions } from '@actions/project-task.actions';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectComponent } from '@components/project/project.component';
import { TaskComponent } from '@components/task/task.component';
import { UUID } from '@constants/common.constant';
import { TaskCategoryLabels, TaskStateLabels } from '@constants/project.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
import { TaskQueryParams } from '@models/project.model';
import { Store } from '@ngrx/store';
import { selProject_selected } from '@selectors/project/project-ui.selectors';
import { selTask_queryParams } from '@selectors/task/task-ui.selectors';

function formatQueryParams(queryParams: TaskQueryParams): string {

	const { search, status, category, tags } = queryParams;
	const statusText = `[Status: '${status === 'all' ? 'All' : TaskStateLabels[ status ]}']`;
	const categoryText = `[Category: '${category === 'all' ? 'All' : TaskCategoryLabels[ category ]}']`;
	const searchText = search ? `, [Search: '${search}']` : '';
	const tagsText = tags.length > 0 ? `, [Tags: (${tags.join(', ')})]` : '';
	return `${statusText}, ${categoryText}${searchText}${tagsText}`;

}

@Component({
	standalone: true,
	imports: [ PortalComponent, GlyphDirective, CdkMenuModule, RouterLink, ProjectComponent, TaskComponent ],
	selector: 'app-project-container',
	templateUrl: './project.container.html',
	host: { 'class': 'flex flex-col gap-2' }
})
export class ProjectContainer extends BaseComponent {

	private store: Store = inject(Store);
	private queryParams = this.store.selectSignal(selTask_queryParams);

	protected projectExpanded = signal<boolean>(false);
	protected tasksExpanded = signal<Record<UUID, boolean>>({});

	protected project = this.store.selectSignal(selProject_selected);
	protected paramsText = computed(() => formatQueryParams(this.queryParams()));
	protected lengthText = computed(() => this.project()?.tasks.length ?? 0);

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

		this.tasksExpanded.update(map => { map[ id ] = !map[ id ]; return map; });

	}

}
