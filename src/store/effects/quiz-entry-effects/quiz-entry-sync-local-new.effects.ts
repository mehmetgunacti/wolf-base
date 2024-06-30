import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quizEntryActions from 'store/actions/quizEntry.actions';
import { selQuizEntry_LocalNew } from 'store/selectors/quizEntry-selectors/quizEntry-cloud.selectors';

@Injectable()
export class QuizEntrySyncLocalNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.syncLocalNew),
			withLatestFrom(this.store.select(selQuizEntry_LocalNew)),
			switchMap(([, items]) =>

				this.syncService.uploadNew(WolfEntity.quizEntry, items).pipe(

					map(item => quizEntryActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
