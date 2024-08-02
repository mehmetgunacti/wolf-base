import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { NameBase, Task } from 'lib';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { closeEditTaskDialog, create } from 'store/actions/project-task.actions';
import { selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';
import { selTask_selectedTaskGroup } from 'store/selectors/project-task-selectors/task-ui.selectors';

@Component({
	selector: 'app-task-new-form-container',
	templateUrl: './task-new-form-container.component.html',
	styleUrls: ['./task-new-form-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: { '[@fadeOut]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskNewFormContainerComponent {

	private store: Store = inject(Store);

	project: Signal<NameBase | null>;
	taskGroup: Signal<NameBase | null>;

	constructor() {

		this.project = this.store.selectSignal(selProject_selected);
		this.taskGroup = this.store.selectSignal(selTask_selectedTaskGroup);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(create({ task }));

	}

	onClose(): void {

		this.store.dispatch(closeEditTaskDialog());

	}

}
