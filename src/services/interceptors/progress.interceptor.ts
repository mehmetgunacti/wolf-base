import { coreActions } from '@actions/core.actions';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function progressBarInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

	const store = inject(Store);
	store.dispatch(coreActions.showProgressBar());

	return next(req).pipe(

		finalize(() => store.dispatch(coreActions.hideProgressBar()))

	);

}
