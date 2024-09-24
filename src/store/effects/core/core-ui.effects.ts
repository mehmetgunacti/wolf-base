import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Breakpoint, TIMER_DELAY, TIMER_INTERVAL } from '@lib';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { delay, map, switchMap, tap } from 'rxjs/operators';
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
				delay(100), // necessary for setBodyTagAttribute$ to receive action
				map((result) => setBigScreen({ isBigScreen: result.matches }))
			)

	);

	// determine if current runtime environment is mobile phone or not
	// (nav bar will behave differently on mobile)
	setBodyTagAttribute$ = createEffect(

		() => this.actions$.pipe(

			ofType(setBigScreen),
			tap(({ isBigScreen }) => {

				// once the <body> attr 'mobile' is true, never update it again, even if isBigScreen is false
				const bodyAttr = this.document.body.dataset['bigScreen'];
				if (!bodyAttr || bodyAttr === "false")
					this.document.body.dataset['bigScreen'] = isBigScreen.toString();

			})

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
