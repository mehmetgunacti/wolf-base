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

	public show(conf: Partial<ToastConfiguration>): void {

		// create component, add to <body>
		const componentRef = this.componentService.createInBody<ToastComponent>(
			ToastComponent,
			{ conf, top: top(this.toasts.size) }
		);

		// add to map
		this.toasts.set(componentRef.instance.getId(), componentRef);

		// calculate 'top' after one toast is destroyed
		componentRef.instance.close.subscribe(
			id => {

				const ref = this.toasts.get(id);
				if (ref) {
					ref.destroy();
					this.toasts.delete(id);
					this.calcTops();
				}

			}
		);

	}

	private calcTops(): void {

		Array
			.from(this.toasts.values())
			.forEach((e, idx) => {

				e.setInput('top', top(idx));

			});

	}

}
