import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { isApiKeyAvailable } from 'store/core';

export const apiKeyEntered: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {

	const store = inject(Store);
	const router = inject(Router);

	return store.select(isApiKeyAvailable).pipe(

		map(available => {

			console.log(available);
			if (available)
				return true;

			router.navigate(['sync', 'edit']);
			return false;

		})

	);

};