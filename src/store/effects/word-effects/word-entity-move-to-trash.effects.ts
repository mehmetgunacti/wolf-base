import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as wordActions from 'store/actions/word.actions';

@Injectable()
export class WordEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.words.moveToTrash(id)
				).pipe(
					map(() => wordActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Word removed' }))

		)

	);

	loadAllWords$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.moveToTrashSuccess),
			map(({ id }) => wordActions.loadAll())

		)

	);

}
