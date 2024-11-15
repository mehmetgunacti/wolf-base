import { entityActions } from '@actions/entity.actions';
import { taskActions } from '@actions/project-task.actions';
import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class TaskEditEffects {

	private actions$: Actions = inject(Actions);
	private dialogService: Dialog = inject(Dialog);
	// private dialogRef: DialogRef<null, TaskEditFormContainerComponent> | null = null;

	openEditTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				taskActions.openAddTaskDialog,
				taskActions.openEditTaskDialog
			),
			// map(() => {
			// 	this.dialogRef = this.dialogService.open(TaskEditFormContainerComponent, { closeOnNavigation: true });
			// })

		),
		{ dispatch: false }

	);

	closeEditTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				taskActions.closeEditDialog,
				entityActions.createSuccess,
				entityActions.updateSuccess,
			),
			//map(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

}
