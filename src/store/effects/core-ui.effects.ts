import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Breakpoint, LocalStorageService } from 'lib';
import { map, switchMap } from 'rxjs/operators';
import { setBigScreen, setSidebarVisible, switchTheme } from 'store/actions/core-ui.actions';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.lg})`)
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

	setSidebarVisibility$ = createEffect(

		() => this.actions$.pipe(

			ofType(setSidebarVisible),
			switchMap(({ visible }) => this.localStorage.configuration.setSidebarVisible(visible))

		),
		{ dispatch: false }

	);

}
