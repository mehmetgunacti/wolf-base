import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Breakpoint } from 'lib';
import { map } from 'rxjs/operators';
import { CoreActions } from 'store/actions';

@Injectable()
export class UIEffects {

	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${ Breakpoint.lg })`)
			.pipe(
				map((result) => CoreActions.UI.setBigScreen({ isBigScreen: result.matches }))
			)

	);

}
