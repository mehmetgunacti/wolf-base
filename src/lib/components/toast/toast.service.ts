import { ComponentRef, Injectable, inject } from '@angular/core';
import { ComponentService } from '@services/component.service';
import { ToastComponent } from './toast.component';
import { ToastConfiguration } from './toast.util';

function top(pos: number): string {

	return `calc(var(--header-height) + 0.3rem + ${pos * 5.5}rem)`;

}

@Injectable({ providedIn: 'root' })
export class ToastService {

	private componentService = inject(ComponentService);
	private toasts = new Map<string, ComponentRef<ToastComponent>>();

	public show(c: Partial<ToastConfiguration>): void {

		// add duration if not 'error'
		const conf = c.severity === 'error' ? c : { ...c, life: 3000 };

		// create component, add to <body>
		const componentRef = this.componentService.createInBody<ToastComponent>(
			ToastComponent,
			{ conf, top: top(this.toasts.size) }
		);

		// add to map
		this.toasts.set(componentRef.instance.getId(), componentRef);

		// calculate 'top' after one toast is destroyed
		componentRef.instance.close.subscribe(id => {

			const ref = this.toasts.get(id);
			if (ref)
				this.destroyToast(ref);

		});
		//
		// 		if (conf.severity !== 'error')
		// 			setTimeout(
		// 				() => this.destroyToast(componentRef),
		// 				conf.life
		// 			);

	}

	private destroyToast(ref: ComponentRef<ToastComponent>): void {

		ref.destroy();
		this.toasts.delete(ref.instance.getId());
		this.calcTops();

	}

	private calcTops(): void {

		Array
			.from(this.toasts.values())
			.forEach((e, idx) => {

				e.setInput('top', top(idx));

			});

	}

}
