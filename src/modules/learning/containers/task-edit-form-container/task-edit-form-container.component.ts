import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, NameBase, Task, UUID } from 'lib';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { entityActions, taskActions } from 'store/actions';
import { selLearning_selected } from 'store/selectors/learning/learning-ui.selectors';
import { selTask_distinctTagNames } from 'store/selectors/task/task-tags.selectors';
import { selTask_SelectedEntity } from 'store/selectors/task/task-ui.selectors';

@Component({
	selector: 'app-task-edit-form-container',
	templateUrl: './task-edit-form-container.component.html',
	styleUrls: ['./task-edit-form-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: {
		'[@fadeOut]': '',
		'class': 'd-flex-column'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditFormContainerComponent {

	private store: Store = inject(Store);

	tagInput = new Subject<string | null>();

	task: Signal<Task | null>;
	learning: Signal<NameBase | null>;
	tagSuggestions$!: Observable<string[]>;

	constructor() {

		this.task = this.store.selectSignal(selTask_SelectedEntity);
		this.learning = this.store.selectSignal(selLearning_selected);

	}

	ngAfterContentInit(): void {

		this.tagSuggestions$ = combineLatest([
			this.store.select(selTask_distinctTagNames),
			this.tagInput
		]).pipe(

			map(([tags, tagInput]) => {

				if (!!tagInput)
					return tags.filter(t => t.startsWith(tagInput));
				return [];

			})

		);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.task, entity: task }));

	}

	onUpdate(id: UUID, task: Partial<Task>): void {

		this.store.dispatch(entityActions.update({ entityType: AppEntityType.task, id, entity: task }));

	}

	onClose(): void {

		this.store.dispatch(taskActions.closeEditDialog());

	}

	onTagInput(val: string | null): void {

		this.tagInput.next(val);

	}

}
