import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { toastTrigger } from './toast.animation';
import { ToastConfiguration } from './toast.util';
import { WolfToastRef } from './toast.service';

@Component({
	selector: 'app-toast-wrapper',
	templateUrl: './toast-wrapper.component.html',
	animations: [toastTrigger]
})
export class ToastWrapperComponent {

	private toastRef: WolfToastRef = inject(WolfToastRef);

	toasts$: Observable<ToastConfiguration[]>;

	constructor() {

		this.toasts$ = this.toastRef.toasts$.pipe(map(conf => conf.reverse()));

	}

	onClose(id: number): void {

		if (id > -1)
			this.toastRef.remove(id);

	}

}
