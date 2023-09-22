import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { UUID } from "lib";
import { Observable, of, switchMap, tap, withLatestFrom } from "rxjs";
import { navigate } from "store/actions/core-navigation.actions";
import { showNotification } from "store/actions/core-notification.actions";
import { setSelected } from "store/actions/knowledge-base.actions";
import { selKBEntries } from "store/selectors/knowledge-base-entities.selectors";

export const kbEntryGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const id: UUID | null = route.paramMap.get('id');

	return of(id).pipe(

		withLatestFrom(store.select(selKBEntries)),
		switchMap(([id, entries]) => {

			// check id
			if (id == null)
				return preventRouting(store, 'id not available', 'ID: ' + id);

			// retrieve entry
			const entry = entries[id];
			if (entry)
				return of(true).pipe(

					// dispatch id
					tap(() => store.dispatch(setSelected({ id })))

				);

			// dispatch error if no entry found
			return preventRouting(store, 'KB Entry not found', 'ID: ' + id);

		})

	);

}

function preventRouting(store: Store, summary: string, detail: string): Observable<boolean> {

	return of(false).pipe(

		tap(() => store.dispatch(showNotification({ severity: 'warn', summary, detail }))),
		tap(() => store.dispatch(navigate({ url: 'kb' }))),

	);

}