import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { toastTrigger } from './toast.animation';
import { ToastComponent } from './toast.component';
import { WolfToastRef } from './toast.service';
import { ToastConfiguration } from './toast.util';

@Component({
	standalone: true,
	selector: 'w-toast-wrapper',
	templateUrl: './toast-wrapper.component.html',
	styleUrl: './toast-wrapper.component.scss',
	imports: [CommonModule, ToastComponent],
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
