import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalRepositoryService, SidebarAnimation } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { setSidebarAnimation } from 'store/actions/core-ui.actions';
import * as coreActions from 'store/actions/core.actions';
import { selCore_isBigScreen } from 'store/selectors/core/core-ui.selectors';

@Injectable()
export class CoreSidebarEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private document: Document = inject(DOCUMENT);
	private router: Router = inject(Router);

	setSidebarAnimation$ = createEffect(

		() => this.actions$.pipe(

			ofType(setSidebarAnimation),
			tap(({ animation }) => console.log(animation)) // this.localRepository.configuration.setSidebarState(sidebarState))
			//switchMap(({ animation }) => console.log(animation)) // this.localRepository.configuration.setSidebarState(sidebarState))

		), { dispatch: false }

	);

	setSidebarAnimationOnBodyTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(setSidebarAnimation),
			map(({ animation }) => {

				this.document.body.dataset['animation'] = animation;

			})

		), { dispatch: false }

	);

	// on mobile close navbar after navbar link clicked
	successfulNavigation$ = createEffect(

		() => this.router.events.pipe(

			withLatestFrom(this.store.select(selCore_isBigScreen)),
			filter(([event, bigScreen]) => !bigScreen && event instanceof NavigationEnd),
			map(() => setSidebarAnimation({ animation: SidebarAnimation.TO_HIDDEN }))

		)

	);

	// reactToViewportSize$ = createEffect(

	// 	() => this.store.select(selCore_isBigScreen).pipe(

	// 		withLatestFrom(this.store.select(selCore_sidebarState)),
	// 		filter(([isBigScreen, sidebarState]) => !isBigScreen && sidebarState === SidebarState.HALF),
	// 		map(() => setSidebarState({ sidebarState: SidebarState.HIDDEN }))

	// 	)

	// );

	onPageLoad$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.loadAllSuccess),
			tap(({ configuration }) => console.log(configuration))
			// map(({ configuration }) => setSidebarAnimation({ animation: SidebarAnimation.TO_HALF // sidebarState: configuration.sidebarState })))
		), { dispatch: false } // remove

	);

}
