import { projectActions } from '@actions/project.actions';
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { UUID } from '@constants/common.constant';
import { Store } from "@ngrx/store";
import { Observable, of, tap } from "rxjs";


export const setSelectedIdGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

	const store = inject(Store);
	const id: UUID | null = route.paramMap.get('id');
	return of(true).pipe(

		// dispatch id
		tap(() => store.dispatch(projectActions.setSelectedId({ id })))

	);

};
