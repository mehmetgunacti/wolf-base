import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, Word } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as wordActions from 'store/actions/word.actions';

@Injectable()
export class WordEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.create),
			switchMap(({ word }) =>

				from(
					this.localRepository.words.create(word)
				).pipe(
					map((word: Word) => wordActions.createSuccess({ word }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Word created' }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.createSuccess),
			map(({ word }) => navigate({ url: ['/words', word.id] }))

		)

	);

	createSuccessToLoadOneWord$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.createSuccess),
			map(({ word }) => wordActions.loadOne({ id: word.id }))

		)

	);

}
