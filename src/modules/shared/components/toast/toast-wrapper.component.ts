import { Component, inject } from '@angular/core';
import { ToastConfiguration } from 'lib';
import { fadeInFadeOutTrigger } from 'modules/shared/animations/fade-in-fade-out.animation';
import { Observable } from 'rxjs';
import { W359ToastRef } from 'services';

@Component({
	selector: 'app-toast-wrapper',
	templateUrl: './toast-wrapper.component.html',
	animations: [fadeInFadeOutTrigger]
})
export class ToastWrapperComponent {

	private toastRef: W359ToastRef = inject(W359ToastRef);

	toasts$: Observable<ToastConfiguration[]>;

	constructor() {
		this.toasts$ = this.toastRef.toasts$;
	}

	onClose(id: number): void {

		this.toastRef.remove(id);

	}

}
