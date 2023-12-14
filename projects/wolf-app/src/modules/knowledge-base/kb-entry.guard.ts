import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { UUID } from "lib";
import { Observable, iif, of, switchMap, tap } from "rxjs";
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from "store/actions/core-notification.actions";
import { setSelected } from "store/actions/kb-entry-entity.actions";
import { selKBEntryIDs } from "store/selectors/knowledge-base-entities.selectors";

export const kbEntryGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const paramId: UUID | null = route.paramMap.get('id');
	if (paramId === null)
		return preventRouting(store, 'Navigation Error', 'ID could not be read from URL');

	const id: UUID = paramId;
	return store.select(selKBEntryIDs).pipe(

		switchMap(entrIds => iif(

			() => entrIds.includes(id),
			of(true).pipe(

				// dispatch id
				tap(() => store.dispatch(setSelected({ id })))

			),
			preventRouting(store, 'KB Entry not found', 'ID: ' + id)

		))

	);

}

function preventRouting(store: Store, summary: string, detail: string): Observable<boolean> {

	return of(false).pipe(

		tap(() => store.dispatch(showNotification({ severity: 'warn', summary, detail }))),
		tap(() => store.dispatch(navigate({ url: '/kb' })))

	);

}
