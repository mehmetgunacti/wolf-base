import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { UUID } from "lib";
import { Observable, iif, of, switchMap, tap, withLatestFrom } from "rxjs";
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from "store/actions/core-notification.actions";
import { setSelectedId } from 'store/actions/note.actions';
import { selNoteIds } from 'store/selectors/note-selectors/note-entities.selectors';

export const noteEntryGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const paramId: UUID | null = route.paramMap.get('id');
	if (paramId === null)
		return preventRouting(store, 'Navigation Error', 'ID could not be read from URL');

	const id: UUID = paramId;
	return of(id).pipe(

		withLatestFrom(store.select(selNoteIds)),
		switchMap(([id, ids]) =>

			iif(

				() => ids.includes(id),
				of(true).pipe(

					// dispatch id
					tap(() => store.dispatch(setSelectedId({ id })))

				),
				preventRouting(store, 'Note not found', 'ID: ' + id)

			)

		)

	);

}

function preventRouting(store: Store, summary: string, detail: string): Observable<boolean> {

	return of(false).pipe(

		tap(() => store.dispatch(showNotification({ severity: 'warn', summary, detail }))),
		tap(() => store.dispatch(navigate({ url: ['/notes'] })))

	);

}
