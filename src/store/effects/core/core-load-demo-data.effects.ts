import { coreActions } from '@actions/core.actions';
import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selEntity_storeEmpty } from '@selectors/entity/entity.selectors';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { demoDataBookmarks } from 'data/bookmarks';
import { environment } from 'environments/environment';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CoreLoadDemoDataEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	createDemoData$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.loadAllSuccess),
			filter(() => environment.isDemo),
			concatLatestFrom(() => this.store.select(selEntity_storeEmpty)),
			filter(([ , storeEmpty ]) => storeEmpty),

			switchMap(() => this.localRepository.bookmarks.createAll(demoDataBookmarks)),

			map(values => coreActions.createDemoDataSuccess())

		)

	);

	dispatchLoadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.createDemoDataSuccess),
			map(values => coreActions.loadAll())

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.createDemoDataSuccess),
			map(values => coreActions.showNotification({ severity: 'success', summary: 'Demo data loaded' }))

		)

	);

}
