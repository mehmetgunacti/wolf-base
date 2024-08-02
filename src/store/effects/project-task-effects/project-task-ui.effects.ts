import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { TaskNewFormContainerComponent } from 'modules/project/containers/task-new-form-container/task-new-form-container.component';
import { map } from 'rxjs';
import * as taskActions from 'store/actions/project-task.actions';

@Injectable()
export class TaskUIEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);

	private dialogService: Dialog = inject(Dialog);

	private dialogRef: DialogRef<null, TaskNewFormContainerComponent> | null = null;

	openAddTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.openAddTaskDialog),
			map(() => {
				this.dialogRef = this.dialogService.open(TaskNewFormContainerComponent, { closeOnNavigation: true });
			})

		),
		{ dispatch: false }

	);

	closeEditTaskDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				taskActions.closeEditTaskDialog,
				taskActions.createSuccess,
				taskActions.updateSuccess,
				taskActions.moveToTrashSuccess
			),
			map(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

}
