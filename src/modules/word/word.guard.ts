import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { UUID } from "lib";
import { Observable, of } from "rxjs";

export const setSelectedIdGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const id: UUID | null = route.paramMap.get('id');
	return of(true).pipe(

		// dispatch id
		// tap(() => store.dispatch(setSelectedId({ id })))

	);

}

// export const wordEntryGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

// 	const store = inject(Store);
// 	const paramId: UUID | null = route.paramMap.get('id');
// 	if (paramId === null)
// 		return preventRouting(store, 'Navigation Error', 'ID could not be read from URL');

// 	const id: UUID = paramId;
// 	return of(id).pipe(

// 		withLatestFrom(store.select(selWordIds)),
// 		switchMap(([id, ids]) =>

// 			iif(

// 				() => ids.includes(id),
// 				of(true).pipe(

// 					// dispatch id
// 					tap(() => store.dispatch(setSelectedId({ id })))

// 				),
// 				preventRouting(store, 'Word not found', 'ID: ' + id)

// 			)

// 		)

// 	);

// }

// function preventRouting(store: Store, summary: string, detail: string): Observable<boolean> {

// 	return of(false).pipe(

// 		tap(() => store.dispatch(showNotification({ severity: 'warn', summary, detail }))),
// 		tap(() => store.dispatch(navigate({ url: ['/words'] })))

// 	);

// }
