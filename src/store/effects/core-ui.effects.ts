import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Breakpoint } from '@lib';
import { createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { setBigScreen } from 'store/actions/core-ui.actions';

@Injectable()
export class CoreUIEffects {

	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${Breakpoint.md})`)
			.pipe(
				map((result) => setBigScreen({ isBigScreen: result.matches }))
			)

	);

}
