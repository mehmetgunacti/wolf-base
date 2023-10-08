import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Breakpoint, LocalStorageService } from '@lib';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { hideSidebar, setBigScreen, switchTheme, toggleSidebar } from 'store/actions/core-ui.actions';
import { Store } from '@ngrx/store';
import { selCoreIsSidebarVisible } from 'store/selectors/core-ui.selectors';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

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
			switchMap(() => this.localStorage.configuration.toggleTheme())

		),
		{ dispatch: false }

	);

	toggleSidebar$ = createEffect(

		() => this.actions$.pipe(

			ofType(toggleSidebar),
			withLatestFrom(this.store.select(selCoreIsSidebarVisible)),
			switchMap(([, visible]) => this.localStorage.configuration.setSidebarVisible(!visible))

		),
		{ dispatch: false }

	);

	hideSidebar$ = createEffect(

		() => this.actions$.pipe(

			ofType(hideSidebar),
			switchMap(() => this.localStorage.configuration.setSidebarVisible(false))

		),
		{ dispatch: false }

	);

}
