import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as quizEntryActions from 'store/actions/quizEntry.actions';

@Injectable()
export class QuizEntryLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.quizEntries.getEntity(id),
					this.localRepository.quizEntries.getSyncData(id),
					this.localRepository.quizEntries.getRemoteMetadata(id)

				])
			),
			map(([id, quizEntry, syncData, remoteMetadata]) => quizEntryActions.loadOneSuccess({ id, quizEntry, syncData, remoteMetadata }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.quizEntries.list(),
					this.localRepository.quizEntries.listSyncData(),
					this.localRepository.quizEntries.listRemoteMetadata()

				])

			),
			map(([quizEntries, syncData, remoteMetadata]) => quizEntryActions.loadAllSuccess({ quizEntries, syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.quizEntries.getSyncData(id)).pipe(

					map(syncData => quizEntryActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.quizEntries.listRemoteMetadata()),
			map(remoteMetadata => quizEntryActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

}
