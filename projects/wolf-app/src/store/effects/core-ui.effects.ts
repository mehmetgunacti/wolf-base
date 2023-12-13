import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Breakpoint, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { hideSidebar, setBigScreen, switchTheme, toggleSidebar } from 'store/actions/core-ui.actions';
import { selCoreIsBigScreen, selCoreIsSidebarVisible } from 'store/selectors/core-ui.selectors';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private router: Router = inject(Router);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.md})`)
			.pipe(
				map((result) => setBigScreen({ isBigScreen: result.matches }))
			)

	);

	setTheme$ = createEffect(

		() => this.actions$.pipe(

			ofType(switchTheme),
			switchMap(() => this.localRepository.configuration.toggleTheme())

		),
		{ dispatch: false }

	);

	toggleSidebar$ = createEffect(

		() => this.actions$.pipe(

			ofType(toggleSidebar),
			withLatestFrom(this.store.select(selCoreIsSidebarVisible)),
			switchMap(([, visible]) => this.localRepository.configuration.setSidebarVisible(!visible))

		),
		{ dispatch: false }

	);

	hideSidebar$ = createEffect(

		() => this.actions$.pipe(

			ofType(hideSidebar),
			switchMap(() => this.localRepository.configuration.setSidebarVisible(false))

		),
		{ dispatch: false }

	);

	successfulNavigation$ = createEffect(

		() => this.router.events.pipe(

			withLatestFrom(this.store.select(selCoreIsBigScreen)),
			filter(([event, bigScreen]) => !bigScreen && event instanceof NavigationEnd),
			map(() => hideSidebar())

		)

	);

}
