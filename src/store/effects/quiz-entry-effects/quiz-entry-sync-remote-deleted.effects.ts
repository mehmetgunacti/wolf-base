import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import { selQuizEntry_RemoteDeleted } from 'store/selectors/quiz-entry-selectors/quiz-entry-cloud.selectors';

@Injectable()
export class QuizEntrySyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selQuizEntry_RemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(EntityType.quizEntry, items).pipe(

					map(item => quizEntryActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
