import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Breakpoint } from '@lib';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { interval, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { setBigScreen, setNow } from 'store/actions/core-ui.actions';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.md})`)
			.pipe(
				map((result) => setBigScreen({ isBigScreen: result.matches }))
			)

	);

	setNow$ = createEffect(

		() => this.actions$.pipe(

			ofType(ROOT_EFFECTS_INIT),
			switchMap(

				() => interval(60 * 1000).pipe(map(() => setNow()))

			)

		)

	);

}
