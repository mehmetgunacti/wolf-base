import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Breakpoint, CLASS_BIGSCREEN, TIMER_DELAY, TIMER_INTERVAL } from '@lib';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { setBigScreen, setNow } from 'store/actions/core-ui.actions';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	private document: Document = inject(DOCUMENT);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.md})`)
			.pipe(
				delay(100), // necessary for setBodyTagAttribute$ (effect below ↓) to receive action
				map((result) => setBigScreen({ isBigScreen: result.matches }))
			)

	);

	// determine if current runtime environment is mobile phone or bigger
	// (nav bar will behave differently on mobile)
	setBodyTagAttribute$ = createEffect(

		() => this.actions$.pipe(

			ofType(setBigScreen),
			filter(({ isBigScreen }) => !!isBigScreen),
			tap(() => this.document.body.classList.add(CLASS_BIGSCREEN))

		), { dispatch: false }

	);

	setNow$ = createEffect(

		() => this.actions$.pipe(

			ofType(ROOT_EFFECTS_INIT),
			switchMap(

				() => timer(TIMER_DELAY, TIMER_INTERVAL).pipe(map(() => setNow()))

			)

		)

	);

}
