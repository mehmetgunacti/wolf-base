import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskEditFormContainerComponent } from 'modules/project/containers/task-edit-form-container/task-edit-form-container.component';
import { map } from 'rxjs';
import { entityActions, taskActions } from 'store/actions';

@Injectable()
export class TaskEditEffects {

	private actions$: Actions = inject(Actions);
	private dialogService: Dialog = inject(Dialog);
	private dialogRef: DialogRef<null, TaskEditFormContainerComponent> | null = null;

	openEditTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				taskActions.openAddTaskDialog,
				taskActions.openEditTaskDialog
			),
			map(() => {
				this.dialogRef = this.dialogService.open(TaskEditFormContainerComponent, { closeOnNavigation: true });
			})

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
			map(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

}
