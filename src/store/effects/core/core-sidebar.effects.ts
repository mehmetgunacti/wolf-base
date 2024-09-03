import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalRepositoryService, SidebarState, replaceByPrefix } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { setSidebarState } from 'store/actions/core-ui.actions';
import { loadAllSuccess } from 'store/actions/core.actions';
import { selCore_isBigScreen, selCore_sidebarState } from 'store/selectors/core/core-ui.selectors';

@Injectable()
export class CoreSidebarEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private document: Document = inject(DOCUMENT);
	private router: Router = inject(Router);

	setSidebarState$ = createEffect(

		() => this.actions$.pipe(

			ofType(setSidebarState),
			switchMap(({ sidebarState }) => this.localRepository.configuration.setSidebarState(sidebarState))

		), { dispatch: false }

	);

	setSidebarStateOnBodyTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(setSidebarState),
			map(({ sidebarState }) => {

				const currentList: string[] = this.document.body.classList.value.split(' ');
				const list: string[] = replaceByPrefix(currentList, 'sidebar-', sidebarState);
				this.document.body.className = list.join(' ');

			})

		), { dispatch: false }

	);

	successfulNavigation$ = createEffect(

		() => this.router.events.pipe(

			withLatestFrom(this.store.select(selCore_isBigScreen)),
			filter(([event, bigScreen]) => !bigScreen && event instanceof NavigationEnd),
			map(() => setSidebarState({ sidebarState: SidebarState.HIDDEN }))

		)

	);

	reactToViewportSize$ = createEffect(

		() => this.store.select(selCore_isBigScreen).pipe(

			withLatestFrom(this.store.select(selCore_sidebarState)),
			filter(([isBigScreen, sidebarState]) => !isBigScreen && sidebarState === SidebarState.HALF),
			map(() => setSidebarState({ sidebarState: SidebarState.HIDDEN }))

		)

	);

	onPageLoad$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadAllSuccess),
			map(({ configuration }) => setSidebarState({ sidebarState: configuration.sidebarState })))

	);

}
