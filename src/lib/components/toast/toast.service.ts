import { ComponentRef, Injectable, inject } from '@angular/core';
import { ComponentService } from '@services/component.service';
import { ToastComponent } from './toast.component';
import { ToastConfiguration } from './toast.util';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {

	private componentService = inject(ComponentService);

	private ref: ComponentRef<ToastComponent> | null = null;

	public show(conf: Partial<ToastConfiguration>): void {

		const componentRef = this.componentService.createInBody<ToastComponent>(
			ToastComponent,
			{ conf }
		);
		this.ref = componentRef;
		componentRef.instance.show();
		console.log(componentRef.instance);

		// componentRef.instance.afterViewInit.pipe(
		// 	take(1)
		// ).subscribe(() => {
		// 	componentRef.instance.show();
		// });

	}

	public show2():void {

		if (this.ref)
			this.ref.instance.show();

	}

}
