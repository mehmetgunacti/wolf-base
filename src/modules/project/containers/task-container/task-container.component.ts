import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task, UUID } from 'lib';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { closeTaskDialog, openEditTaskDialog } from 'store/actions/project-task.actions';
import { selTask_selected } from 'store/selectors/project-task-selectors/task-ui.selectors';

@Component({
	selector: 'app-task-container',
	templateUrl: './task-container.component.html',
	styleUrls: ['./task-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: { '[@fadeOut]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskContainerComponent {

	private store: Store = inject(Store);

	task: Signal<Task | null>;

	constructor() {

		this.task = this.store.selectSignal(selTask_selected);

	}

	onClose(): void {

		this.store.dispatch(closeTaskDialog());

	}

	onEdit(): void {

		this.store.dispatch(openEditTaskDialog());

	}

}
