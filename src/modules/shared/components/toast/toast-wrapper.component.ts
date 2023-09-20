import { Component, inject } from '@angular/core';
import { ToastConfiguration } from 'lib';
import { toastTrigger } from 'modules/shared/animations';
import { Observable, map } from 'rxjs';
import { W359ToastRef } from 'services';

@Component({
	selector: 'app-toast-wrapper',
	templateUrl: './toast-wrapper.component.html',
	animations: [toastTrigger]
})
export class ToastWrapperComponent {

	private toastRef: W359ToastRef = inject(W359ToastRef);

	toasts$: Observable<ToastConfiguration[]>;

	constructor() {
		this.toasts$ = this.toastRef.toasts$.pipe(map(conf => conf.reverse()));
	}

	onClose(id: number): void {

		if (id > -1)
			this.toastRef.remove(id);

	}

}
