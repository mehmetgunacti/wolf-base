import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppEntityType } from '@constants';
import { SyncService } from '@libServices';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SYNC_SERVICE } from 'services';
import { entityActions } from '@actions';
import * as selectors from '@selectors';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selectors.selBookmark_LocalNew;
		case AppEntityType.note: return selectors.selNote_LocalNew;
		case AppEntityType.noteContent: return selectors.selNoteContent_LocalNew;
		case AppEntityType.project: return selectors.selProject_LocalNew;
		case AppEntityType.quizEntry: return selectors.selQuizEntry_LocalNew;
		case AppEntityType.quote: return selectors.selQuote_LocalNew;
		case AppEntityType.task: return selectors.selTask_LocalNew;
		case AppEntityType.word: return selectors.selWord_LocalNew;

	}

}

@Injectable()
export class EntitySyncLocalNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncLocalNew),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.uploadNew(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
