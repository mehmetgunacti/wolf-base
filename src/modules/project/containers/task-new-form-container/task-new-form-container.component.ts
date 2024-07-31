import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from 'lib';

@Component({
	selector: 'app-task-new-form-container',
	templateUrl: './task-new-form-container.component.html',
	styleUrls: ['./task-new-form-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskNewFormContainerComponent {

	private store: Store = inject(Store);

	onCreate(task: Partial<Task>): void {

		// this.store.dispatch(create({ task }));

	}

}
