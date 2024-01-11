import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { LogCategory, UUID } from "lib";
import { Observable, of, tap } from "rxjs";
import { load } from 'store/actions/logs.actions';

export const setSelectedIdGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const id: UUID | null = route.paramMap.get('id');
	return of(true).pipe(

		tap(() => store.dispatch(load({ selectedId: id, categories: [LogCategory.notification] })))

	);

}
