import { Component, inject } from '@angular/core';
import { ToastConfiguration } from 'lib';
import { slideLeftSlideUpTrigger } from 'modules/shared/animations';
import { Observable } from 'rxjs';
import { W359ToastRef } from 'services';

@Component({
	selector: 'app-toast-wrapper',
	templateUrl: './toast-wrapper.component.html',
	animations: [slideLeftSlideUpTrigger]
})
export class ToastWrapperComponent {

	private toastRef: W359ToastRef = inject(W359ToastRef);

	toasts$: Observable<ToastConfiguration[]>;

	constructor() {
		this.toasts$ = this.toastRef.toasts$;
	}

	onClose(id: number): void {

		if (id > -1)
			this.toastRef.remove(id);

	}

}
