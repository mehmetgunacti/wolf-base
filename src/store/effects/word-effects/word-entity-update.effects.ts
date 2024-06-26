import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as wordActions from 'store/actions/word.actions';

@Injectable()
export class WordEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.update),
			switchMap(({ id, word }) =>

				from(
					this.localRepository.words.update(id, word)
				).pipe(
					map(() => wordActions.updateSuccess({ id }))
				)

			)

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.updateSuccess),
			map(({ id }) => navigate({ url: ['/words', id] }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Word updated' }))

		)

	);

	loadOneWord$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.updateSuccess),
			map(({ id }) => wordActions.loadOne({ id }))

		)

	);

	loadOneWordSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.updateSuccess),
			map(({ id }) => wordActions.loadOneSyncData({ id }))

		)

	);

}
