import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { toastTrigger } from './toast.animation';
import { WolfToastRef } from './toast.service';
import { ToastConfiguration } from './toast.util';

@Component({
	selector: 'w-toast-wrapper',
	templateUrl: './toast-wrapper.component.html',
	styleUrl: './toast-wrapper.component.scss',
	host: { 'class': 'd-flex-column gap m-xl' },
	animations: [toastTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
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
