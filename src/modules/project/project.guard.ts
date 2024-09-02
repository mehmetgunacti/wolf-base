import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppEntityType, UUID } from "lib";
import { Observable, of, tap } from "rxjs";
import { setSelectedId } from 'store/actions/entity.actions';

export const setSelectedIdGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const id: UUID | null = route.paramMap.get('id');
	return of(true).pipe(

		// dispatch id
		tap(() => store.dispatch(setSelectedId({ entityType: AppEntityType.project, id })))

	);

}
