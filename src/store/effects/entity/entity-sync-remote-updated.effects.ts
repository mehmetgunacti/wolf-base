import { entityActions } from '@actions';
import { Injectable, inject } from '@angular/core';
import { AppEntityType } from '@constants';
import { SyncService } from '@libServices';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as selectors from '@selectors';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SYNC_SERVICE } from 'services';

function useSelector(entityType: AppEntityType) {

	switch (entityType) {

		case AppEntityType.bookmark: return selectors.selBookmark_RemoteUpdated;
		case AppEntityType.note: return selectors.selNote_RemoteUpdated;
		case AppEntityType.noteContent: return selectors.selNoteContent_RemoteUpdated;
		case AppEntityType.project: return selectors.selProject_RemoteUpdated;
		case AppEntityType.quizEntry: return selectors.selQuizEntry_RemoteUpdated;
		case AppEntityType.quote: return selectors.selQuote_RemoteUpdated;
		case AppEntityType.task: return selectors.selTask_RemoteUpdated;
		case AppEntityType.word: return selectors.selWord_RemoteUpdated;

	}

}

@Injectable()
export class EntitySyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.syncRemoteUpdated),
			switchMap(({ entityType }) => {

				const selector = useSelector(entityType);
				return of(entityType).pipe(withLatestFrom(this.store.select(selector)));

			}),
			switchMap(([ entityType, items ]) =>

				this.syncService.downloadUpdated(entityType, items).pipe(

					map(item => entityActions.loadOne({ entityType, id: item.id }))

				)

			)

		)

	);

}
