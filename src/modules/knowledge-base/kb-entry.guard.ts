import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { UUID } from "lib";
import { Observable, iif, of, switchMap, tap } from "rxjs";
import { showNotification } from "store/actions/core-notification.actions";
import { setSelected } from "store/actions/kb-entry-entity.actions";
import { selKBEntriesDictionary } from "store/selectors/knowledge-base-entities.selectors";

export const kbEntryGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const paramId: UUID | null = route.paramMap.get('id');
	if (paramId === null)
		return preventRouting(store, 'Navigation Error', 'ID could not be read from URL');

	const id: UUID = paramId;
	return store.select(selKBEntriesDictionary).pipe(

		switchMap(entries => iif(

			() => entries[id] === null,
			preventRouting(store, 'KB Entry not found', 'ID: ' + id),
			of(true).pipe(

				// dispatch id
				tap(() => store.dispatch(setSelected({ id })))

			)

		))

	);

}

function preventRouting(store: Store, summary: string, detail: string): Observable<boolean> {

	return of(false).pipe(

		tap(() => store.dispatch(showNotification({ severity: 'warn', summary, detail })))

	);

}