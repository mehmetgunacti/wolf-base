import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as quoteActions from 'store/actions/quote.actions';

@Injectable()
export class QuoteLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.quotes.getEntity(id),
					this.localRepository.quotes.getSyncData(id),
					this.localRepository.quotes.getRemoteMetadata(id)

				])
			),
			map(([id, quote, syncData, remoteMetadata]) => quoteActions.loadOneSuccess({ id, quote, syncData, remoteMetadata }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.quotes.list(),
					this.localRepository.quotes.listSyncData(),
					this.localRepository.quotes.listRemoteMetadata()

				])

			),
			map(([quotes, syncData, remoteMetadata]) => quoteActions.loadAllSuccess({ quotes, syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.quotes.getSyncData(id)).pipe(

					map(syncData => quoteActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(quoteActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.quotes.listRemoteMetadata()),
			map(remoteMetadata => quoteActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

}
