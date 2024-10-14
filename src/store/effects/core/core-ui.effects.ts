import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { TIMER_DELAY, TIMER_INTERVAL } from '@constants';
import { LocalRepositoryService } from '@libServices';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { ViewportService } from 'services/viewport.service';
import { coreActions } from '@actions';
import { selCore_sidebarState } from '@selectors';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private viewport: ViewportService = inject(ViewportService);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	// note: when setting DOM attributes, add a delay(100) here.
	// 'setBigScreen()' may be despatched after startup,
	// but effects may not have been initalized yet
	setBigScreen$ = createEffect(

		() => this.viewport.bigScreen$.pipe(

			map(bigScreen => coreActions.setBigScreen({ bigScreen }))

		)

	);

	dispatchCurrentTimestamp$ = createEffect(

		() => this.actions$.pipe(

			ofType(ROOT_EFFECTS_INIT),
			switchMap(

				() => timer(TIMER_DELAY, TIMER_INTERVAL).pipe(map(() => coreActions.setNow()))

			)

		)

	);

	saveSidebarState$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				coreActions.setBigScreen,
				coreActions.setNextSidebarState,
				coreActions.hideSidebar
			),
			concatLatestFrom(() => this.store.select(selCore_sidebarState)),
			switchMap(([ , state ]) => this.localRepository.configuration.setSidebarState(state))

		), { dispatch: false }

	);

}
