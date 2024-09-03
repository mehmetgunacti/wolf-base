import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppEntityType, NameBase, Task } from 'lib';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { create } from 'store/actions/entity.actions';
import { closeEditDialog } from 'store/actions/project-task.actions';
import { selProject_selected } from 'store/selectors/project/project-ui.selectors';

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

	constructor() {

		this.project = this.store.selectSignal(selProject_selected);

	}

	onCreate(task: Partial<Task>): void {

		this.store.dispatch(create({ entityType: AppEntityType.task, entity: task }));

	}

	onClose(): void {

		this.store.dispatch(closeEditDialog());

	}

}
