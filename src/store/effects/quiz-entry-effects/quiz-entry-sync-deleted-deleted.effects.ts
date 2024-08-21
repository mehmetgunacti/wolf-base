import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import { selQuizEntry_LocalDeletedRemoteDeleted } from 'store/selectors/quiz-entry-selectors/quiz-entry-cloud.selectors';

@Injectable()
export class QuizEntrySyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selQuizEntry_LocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(AppEntityType.quizEntry, items).pipe(

					map(item => quizEntryActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
