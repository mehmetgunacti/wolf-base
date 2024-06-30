import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Breakpoint, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { map, switchMap } from 'rxjs/operators';
import { setBigScreen, setQuotesRunning } from 'store/actions/core-ui.actions';
import { loadOne } from 'store/actions/quote.actions';

@Injectable()
export class CoreUIEffects {

	private actions$: Actions = inject(Actions);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	private repository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.md})`)
			.pipe(
				map((result) => setBigScreen({ isBigScreen: result.matches }))
			)

	);

	setQuotesRunning$ = createEffect(

		() => this.actions$.pipe(

			ofType(setQuotesRunning),
			switchMap(({ running }) => this.repository.configuration.setQuotesRunning(running))

		),
		{ dispatch: false }

	);

}
