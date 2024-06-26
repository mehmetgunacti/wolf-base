import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as wordActions from 'store/actions/word.actions';

@Injectable()
export class WordLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.words.getEntity(id),
					this.localRepository.words.getSyncData(id),
					this.localRepository.words.getRemoteMetadata(id)

				])
			),
			map(([id, word, syncData, remoteMetadata]) => wordActions.loadOneSuccess({ id, word, syncData, remoteMetadata }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.words.list(),
					this.localRepository.words.listSyncData(),
					this.localRepository.words.listRemoteMetadata()

				])

			),
			map(([words, syncData, remoteMetadata]) => wordActions.loadAllSuccess({ words, syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.words.getSyncData(id)).pipe(

					map(syncData => wordActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(wordActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.words.listRemoteMetadata()),
			map(remoteMetadata => wordActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

}
