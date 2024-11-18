import { coreActions } from '@actions/core.actions';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { CLOSE_MENU } from '@constants/sidebar.constant';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selCore_isBigScreen } from '@selectors/core/core-ui.selectors';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable()
export class CoreNavigationEffects {

	private store = inject(Store);
	private actions$ = inject(Actions);
	private router = inject(Router);
	private activatedRoute = inject(ActivatedRoute);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.navigate),
			tap(({ url, queryParams, skipLocationChange }) => this.router.navigate(url, { skipLocationChange, queryParams }))

		),
		{ dispatch: false }

	);

	closeSidebarMenuOnMobile$ = createEffect(

		() => this.router.events.pipe(

			filter((e): e is NavigationEnd => e instanceof NavigationEnd),
			concatLatestFrom((): [ Observable<boolean>, Observable<ParamMap> ] => [
				this.store.select(selCore_isBigScreen),
				this.activatedRoute.queryParamMap
			]),
			filter(([ a, isBigScreen, paramMap ]) => !isBigScreen && !!paramMap.get(CLOSE_MENU)),
			map(() => coreActions.hideSidebar())

		)

	);

}
