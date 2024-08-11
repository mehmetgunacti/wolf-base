import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { NameBase, Task, UUID } from 'lib';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { closeEditDialog, create, openTaskDialog, update } from 'store/actions/project-task.actions';
import { selProject_selected } from 'store/selectors/project-selectors/project-ui.selectors';
import { selTask_selected, selTask_selectedTaskGroup } from 'store/selectors/project-task-selectors/task-ui.selectors';

@Component({
	selector: 'app-task-edit-form-container',
	templateUrl: './task-edit-form-container.component.html',
	styleUrls: ['./task-edit-form-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: { '[@fadeOut]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditFormContainerComponent {

	private store: Store = inject(Store);

	task: Signal<Task | null>;
	project: Signal<NameBase | null>;
	taskGroup: Signal<NameBase | null>;

	constructor() {

		this.task = this.store.selectSignal(selTask_selected);
		this.project = this.store.selectSignal(selProject_selected);
		this.taskGroup = this.store.selectSignal(selTask_selectedTaskGroup);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(create({ task }));

	}

	onUpdate(id: UUID, task: Partial<Task>): void {

		this.store.dispatch(update({ id, task }));

	}

	onCancel(id: UUID): void {

		this.store.dispatch(openTaskDialog({ id }));

	}

	onClose(): void {

		this.store.dispatch(closeEditDialog());

	}

}
