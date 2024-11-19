import { ComponentRef, Injectable, inject } from '@angular/core';
import { ComponentService } from '@services/component.service';
import { ToastComponent } from './toast.component';
import { ToastConfiguration } from './toast.util';

@Injectable({ providedIn: 'root' })
export class ToastService {

	private componentService = inject(ComponentService);
	private toasts = new Map<string, ComponentRef<ToastComponent>>();

	public show(conf: Partial<ToastConfiguration>): void {

		const componentRef = this.componentService.createInBody<ToastComponent>(
			ToastComponent,
			{ conf }
		);
		this.toasts.set(componentRef.instance.getId(), componentRef);
		componentRef.instance.close.subscribe(
			id => {

				const ref = this.toasts.get(id);
				console.log('destroying', id);

				if (ref)
					ref.destroy();

			}
		);

	}

}
