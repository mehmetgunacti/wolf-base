import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as quizEntryActions from 'store/actions/quizEntry.actions';
import { selQuizEntry_LocalDeleted } from 'store/selectors/quizEntry-selectors/quizEntry-cloud.selectors';

@Injectable()
export class QuizEntrySyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selQuizEntry_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(WolfEntity.quizEntry, entities).pipe(

					map(item => quizEntryActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
