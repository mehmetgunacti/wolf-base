import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastConfiguration, errorNotification } from '@lib';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

	constructor(private injector: Injector) { }

	handleError(error: Error) {

		console.error(error);
		const store = this.injector.get(Store);
		store.dispatch(showNotification(this.getToastConfiguration(error)));
		if (error instanceof HttpErrorResponse) {

			if (error.error.code === 'LockedException')
				store.dispatch(navigate({ url: '/change-password', skipLocationChange: true }));

			if (error.error.code === 'InvalidJWTTokenException') {

				localStorage.removeItem('token');
				store.dispatch(navigate({ url: '/login' }));

			}

		}

	}

	private getToastConfiguration = (error: Error): ToastConfiguration => {

		if (error instanceof HttpErrorResponse)
			switch (error.status) {

				case 0: return {

					...errorNotification,
					summary: 'Communication Error',
					detail: `Backend is unreachable`

				};

				case 500: return {

					...errorNotification,
					summary: 'System Failure',
					detail: `Server-side error`

				};

				case 400: return {

					...errorNotification,
					summary: `${(error.error?.[0] || error.error)?.code}`,
					detail: `${(error.error?.[0] || error.error)?.message}`

				};

				case 401: return {

					...errorNotification,
					summary: 'Authorization Error',
					detail: `${error.error?.message}`

				};

				case 404: return {

					...errorNotification,
					summary: 'Not Found',
					detail: `${error.status}`,
					sticky: false

				};

			}

		const summary = `Client Error`;
		let detail = `
			<div>
				<div><i>${error?.message}</i></div>
		`;

		if (error instanceof HttpErrorResponse)
			detail += `
				<div>Status</div>
				<div><i>${error?.statusText} (${error?.status})</i></div>
			`

		detail += `
			</div>
		`;
		return { ...errorNotification, summary, detail };

	}

}
