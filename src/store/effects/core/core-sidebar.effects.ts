import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CLASS_SIDEBAR_PREFIX, LocalRepositoryService, nextSidebarState, replaceByPrefix, SidebarState } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import * as coreUIActions from 'store/actions/core-ui.actions';
import * as coreActions from 'store/actions/core.actions';
import { selCore_isBigScreen, selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';

@Injectable()
export class CoreSidebarEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private document: Document = inject(DOCUMENT);
	private router: Router = inject(Router);

	saveSidebarSateInLocalRepository$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreUIActions.setSidebarState),
			tap(({ state }) => this.localRepository.configuration.setSidebarState(state))

		), { dispatch: false }

	);

	setSidebarStateOnBodyTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreUIActions.setSidebarState),
			map(({ state }) => {

				const currentList: string[] = this.document.body.classList.value.split(' ');
				const list: string[] = replaceByPrefix(currentList, CLASS_SIDEBAR_PREFIX, CLASS_SIDEBAR_PREFIX + state);
				this.document.body.className = list.join(' ').trim();

			})

		), { dispatch: false }

	);

	// when hamburger button is clicked
	setNextSidebarState$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreUIActions.setNextSidebarState),
			concatLatestFrom(() => [
				this.store.select(selCore_sidebarState),
				this.store.select(selCore_isBigScreen)
			]),
			map(([, current, isBigScreen]) => nextSidebarState(current, isBigScreen)),
			map(state => coreUIActions.setSidebarState({ state }))

		)

	);

	closeSidebar$ = createEffect(

		() => this.router.events.pipe(

			withLatestFrom(this.store.select(selCore_isBigScreen)),
			filter(([event, bigScreen]) => !bigScreen && event instanceof NavigationEnd),
			map(() => coreUIActions.setSidebarState({ state: SidebarState.HIDDEN }))

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
