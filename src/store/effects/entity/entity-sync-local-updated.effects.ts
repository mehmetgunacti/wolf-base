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

		case AppEntityType.bookmark: return selectors.selBookmark_LocalUpdated;
		case AppEntityType.note: return selectors.selNote_LocalUpdated;
		case AppEntityType.noteContent: return selectors.selNoteContent_LocalUpdated;
		case AppEntityType.project: return selectors.selProject_LocalUpdated;
		case AppEntityType.quizEntry: return selectors.selQuizEntry_LocalUpdated;
		case AppEntityType.quote: return selectors.selQuote_LocalUpdated;
		case AppEntityType.task: return selectors.selTask_LocalUpdated;
		case AppEntityType.word: return selectors.selWord_LocalUpdated;

	}

}

@Injectable()
export class EntitySyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncLocalUpdated),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.uploadUpdated(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
