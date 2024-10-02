import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NameBase, TASK_CATEGORIES, TASK_STATE, Tag, TaskState, slideUpDownTrigger } from 'lib';
import { Observable, debounceTime, distinctUntilChanged, map, take } from 'rxjs';
import { taskActions } from 'store/actions';
import { distinctTagsArray, relatedTags } from 'store/selectors/task/task-tags.selectors';
import { selTask_queryParams } from 'store/selectors/task/task-ui.selectors';

const all: NameBase = { id: 'all', name: 'All' };

@Component({
	selector: 'app-learning-search-and-tag-cloud-container',
	templateUrl: './learning-search-and-tag-cloud-container.component.html',
	styleUrls: ['./learning-search-and-tag-cloud-container.component.scss'],
	animations: [slideUpDownTrigger],
	host: { 'class': 'box dark d-flex-column p transition-bg shadow' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningSearchAndTagCloudContainerComponent {

	TASK_STATE = [all, ...TASK_STATE];
	TASK_CATEGORIES = [all, ...TASK_CATEGORIES];

	tags$: Observable<Tag[]>;
	selectedTags$: Observable<string[]>;
	relatedTags$: Observable<string[]>;

	@HostBinding('class.open')
	cloudVisible = false;

	fcSearch: FormControl;
	fcStatus: FormControl;
	fcCategory: FormControl;

	constructor(private store: Store) {

		this.tags$ = store.select(distinctTagsArray);
		this.relatedTags$ = store.select(relatedTags);

		const queryParams$ = store.select(selTask_queryParams);
		this.selectedTags$ = queryParams$.pipe(map(q => q.tags));

		this.fcSearch = new FormControl();
		this.fcStatus = new FormControl('');
		this.fcCategory = new FormControl('');

		queryParams$.pipe(
			take(1) // only one value on page load
		).subscribe(params => {

			this.fcSearch.setValue(params.search ?? '');
			this.fcStatus.setValue(params.status);
			this.fcCategory.setValue(params.category);

		});

		// dispatch on search
		this.fcSearch.valueChanges
			.pipe(
				debounceTime(400),
				distinctUntilChanged(),
				takeUntilDestroyed()
			)
			.subscribe(term => this.store.dispatch(taskActions.search({ term })));

		// dispatch on status change
		this.fcStatus.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(status => this.store.dispatch(taskActions.taskStatusChange({ status })));

		// dispatch on category change
		this.fcCategory.valueChanges
			.pipe(takeUntilDestroyed())
			.subscribe(category => this.store.dispatch(taskActions.taskCategoryChange({ category })));

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

		this.cloudVisible = !this.cloudVisible;

	}

}
