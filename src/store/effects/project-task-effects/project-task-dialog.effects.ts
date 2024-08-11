import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskContainerComponent } from 'modules/project/containers/task-container/task-container.component';
import { map } from 'rxjs';
import * as taskActions from 'store/actions/project-task.actions';

@Injectable()
export class TaskEffects {

	private actions$: Actions = inject(Actions);
	private dialogService: Dialog = inject(Dialog);
	private dialogRef: DialogRef<null, TaskContainerComponent> | null = null;

	openTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.openTaskDialog),
			map(() => {
				this.dialogRef = this.dialogService.open(TaskContainerComponent, { closeOnNavigation: true });
			})

		),
		{ dispatch: false }

	);

	closeTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				taskActions.openEditTaskDialog,
				taskActions.closeTaskDialog,
				taskActions.moveToTrashSuccess
			),
			map(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

}
