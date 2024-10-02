import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, NameBase, Task } from 'lib';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { entityActions, taskActions } from 'store/actions';
import { selLearning_selected } from 'store/selectors/learning/learning-ui.selectors';

@Component({
	selector: 'app-task-new-form-container',
	templateUrl: './task-new-form-container.component.html',
	styleUrls: ['./task-new-form-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: {
		'[@fadeOut]': '',
		'class': 'd-flex-column'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskNewFormContainerComponent {

	private store: Store = inject(Store);

	learning: Signal<NameBase | null>;

	constructor() {

		this.learning = this.store.selectSignal(selLearning_selected);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(entityActions.create({ entityType: AppEntityType.task, entity: task }));

	}

	onClose(): void {

		this.store.dispatch(taskActions.closeEditDialog());

	}

}
