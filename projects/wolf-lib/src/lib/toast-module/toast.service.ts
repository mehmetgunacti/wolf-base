import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, Provider } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastConfiguration } from './toast.util';
import { ToastWrapperComponent } from './toast-wrapper.component';

export const WolfToastData = new InjectionToken<ToastConfiguration>('WOLF_TOAST_DATA');

export class WolfToastRef {

	private counter = 0;

	private toasts: Map<number, ToastConfiguration> = new Map();
	private bsToasts = new BehaviorSubject<ToastConfiguration[]>([]);
	public toasts$: Observable<ToastConfiguration[]> = this.bsToasts.asObservable();

	constructor(readonly overlayRef: OverlayRef) { }

	public add(data?: Partial<ToastConfiguration>): void {

		this.toasts.set(this.counter, {
			id: this.counter,
			summary: '',
			detail: '',
			severity: 'info',
			life: 3000,
			...data
		});
		this.bsToasts.next(Array.from(this.toasts.values()));
		this.counter++;

	}

	public remove(id: number): void {

		this.toasts.delete(id);
		this.bsToasts.next(Array.from(this.toasts.values()));
		if (this.toasts.size === 0)
			setTimeout(() => this.close(), 1000);

	}

	close(): void {

		this.overlayRef.dispose();

	}

	isEmpty(): boolean {

		return this.toasts.size === 0;

	}

	getPosition(): DOMRect {

		return this.overlayRef.overlayElement.getBoundingClientRect();

	}

}

@Injectable({ providedIn: 'root' })
export class ToastService {

	private toastRef: WolfToastRef | undefined;

	constructor(
		private overlay: Overlay,
		private parentInjector: Injector
	) {
		console.log('toast service instantiated');
	}

	public show(data?: Partial<ToastConfiguration>): void {

		console.log('toast service showing data', data);
		if (!this.toastRef || this.toastRef.isEmpty())
			this.attach();

		this.toastRef?.add(data);

	}

	private attach(): void {

		const positionStrategy = this.overlay
			.position()
			.global()
			.right()
			.top();

		const overlayRef: OverlayRef = this.overlay.create({ hasBackdrop: false, positionStrategy });
		this.toastRef = new WolfToastRef(overlayRef);

		const injector = this.getInjector(this.parentInjector);
		console.log('toast service before attaching');
		const toastPortal = new ComponentPortal(ToastWrapperComponent, null, injector);
		console.log('toast service after attaching');

		overlayRef.attach(toastPortal);

	}

	private getInjector(parentInjector: Injector): Injector {

		const providers: Provider[] = [
			{
				provide: WolfToastRef,
				useValue: this.toastRef
			}
		];

		return Injector.create({
			parent: parentInjector,
			providers: providers
		});

	}

}
