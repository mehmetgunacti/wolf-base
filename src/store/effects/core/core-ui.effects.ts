import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { TIMER_DELAY, TIMER_INTERVAL } from '@lib';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ViewportService } from 'services/viewport.service';
import { coreUIActions } from 'store/actions';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private viewport: ViewportService = inject(ViewportService);
	private document: Document = inject(DOCUMENT);

	// note: when setting DOM attributes, add a delay(100) here.
	// 'setBigScreen()' may be despatched after startup,
	// but effects may not have been loaded fast enough
	setBigScreen$ = createEffect(

		() => this.viewport.bigScreen$.pipe(
			map(bigScreen => coreUIActions.setBigScreen({ bigScreen }))
		)

	);

	// determine if current runtime environment is mobile phone or bigger
	// (nav bar will behave differently on mobile)
	// setBodyTagAttribute$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(setBigScreen),
	// 		filter(({ isBigScreen }) => !!isBigScreen),
	// 		tap(() => this.document.body.classList.add(CLASS_BIGSCREEN))

	// 	), { dispatch: false }

	// );

	setNow$ = createEffect(

		() => this.actions$.pipe(

			ofType(ROOT_EFFECTS_INIT),
			switchMap(

				() => timer(TIMER_DELAY, TIMER_INTERVAL).pipe(map(() => coreUIActions.setNow()))

			)

		)

	);

}
