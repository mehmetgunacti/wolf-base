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

		case AppEntityType.bookmark: return selectors.selBookmark_LocalDeletedRemoteDeleted;
		case AppEntityType.note: return selectors.selNote_LocalDeletedRemoteDeleted;
		case AppEntityType.noteContent: return selectors.selNoteContent_LocalDeletedRemoteDeleted;
		case AppEntityType.project: return selectors.selProject_LocalDeletedRemoteDeleted;
		case AppEntityType.quizEntry: return selectors.selQuizEntry_LocalDeletedRemoteDeleted;
		case AppEntityType.quote: return selectors.selQuote_LocalDeletedRemoteDeleted;
		case AppEntityType.task: return selectors.selTask_LocalDeletedRemoteDeleted;
		case AppEntityType.word: return selectors.selWord_LocalDeletedRemoteDeleted;

	}

}

@Injectable()
export class EntitySyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncDeletedDeleted),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.downloadDeleted(entityType, items).pipe(

					map(item => entityActions.unloadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
