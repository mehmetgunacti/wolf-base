import { taskActions } from '@actions/project-task.actions';
import { AsyncPipe } from '@angular/common';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { slideUpDownTrigger } from '@animations/slide-in-out.animation';
import { TASK_CATEGORIES, TASK_STATE, TaskCategory, TaskState } from '@constants/project.constant';
import { AutofocusDirective } from '@directives/auto-focus.directive';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { SelectComponent } from '@libComponents/select/select.component';
import { SelectedTagsComponent } from '@libComponents/selected-tags/selected-tags.component';
import { TagCloudComponent } from '@libComponents/tag-cloud/tag-cloud.component';
import { NameBase } from '@models/id-base.model';
import { Store } from '@ngrx/store';
import { selTask_distinctTagsArray, selTask_relatedTags } from '@selectors/task/task-tags.selectors';
import { selTask_queryParams } from '@selectors/task/task-ui.selectors';
import { nnfc } from '@utils/form.util';

const all: NameBase = { id: 'all', name: 'All' };

@Component({
	standalone: true,
	imports: [ GlyphDirective, TagCloudComponent, AsyncPipe, SelectedTagsComponent, ReactiveFormsModule, SelectComponent, AutofocusDirective ],
	selector: 'app-tasks-filter-container',
	templateUrl: './tasks-filter.container.html',
	animations: [ slideUpDownTrigger ],
	host: {
		'class': 'flex flex-col comp comp-dark min-h-14',
		'[class.open]': 'cloudVisible()'
	}
})
export class TasksFilterContainer extends BaseComponent {

	TASK_STATE = [ all, ...TASK_STATE ];
	TASK_CATEGORIES = [ all, ...TASK_CATEGORIES ];

	private store = inject(Store);

	tags = this.store.selectSignal(selTask_distinctTagsArray);
	queryParams = this.store.selectSignal(selTask_queryParams);
	relatedTags = this.store.selectSignal(selTask_relatedTags);
	selectedTags = computed(() => this.queryParams().tags);

	cloudVisible = signal<boolean>(false);

	fcSearch = nnfc<string>('');
	fcStatus = nnfc<TaskState>(TaskState.ongoing);
	fcCategory = nnfc<TaskCategory | 'all'>(TaskCategory.bug);

	constructor() {

		super();

		effect(() => {

			untracked(() => {

				// this.fcSearch.setValue(this.queryParams().search ?? '');

				const status = this.queryParams().status;
				if (status !== 'all')
					this.fcStatus.setValue(status);
				this.fcCategory.setValue(this.queryParams().category);

			});

		});

		// dispatch on search
		// this.fcSearch.valueChanges
		// 	.pipe(
		// 		debounceTime(400),
		// 		distinctUntilChanged(),
		// 		takeUntilDestroyed()
		// 	)
		// 	.subscribe(
		// 		term => this.store.dispatch(taskActions.search({ term }))
		// 	);

		// dispatch on status change
		this.fcStatus.valueChanges
			.pipe(
				takeUntilDestroyed(),
			)
			.subscribe(
				status => this.store.dispatch(taskActions.taskStatusChange({ status }))
			);

		// dispatch on category change
		this.fcCategory.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(
				category => this.store.dispatch(taskActions.taskCategoryChange({ category }))
			);

	}

	onTagClicked(name: string): void {

		this.store.dispatch(taskActions.clickTag({ name }));

	}

	onReset(): void {

		this.fcSearch.reset();
		this.fcStatus.reset(TaskState.ongoing);
		this.fcCategory.reset('all');
		this.store.dispatch(taskActions.resetQueryParams());

	}

	toggleCloud(): void {

		this.cloudVisible.update(val => !val);

	}

}
