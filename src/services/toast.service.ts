import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ToastConfiguration } from 'lib';
import { ToastWrapperComponent } from 'modules';
import { BehaviorSubject, Observable } from 'rxjs';

export const W359ToastData = new InjectionToken<ToastConfiguration>('W359_TOAST_DATA');

export class W359ToastRef {

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

	private toastRef: W359ToastRef | undefined;

	constructor(
		private overlay: Overlay,
		private parentInjector: Injector
	) { }

	public show(data?: Partial<ToastConfiguration>): void {

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
		this.toastRef = new W359ToastRef(overlayRef);

		const injector = this.getInjector(this.parentInjector);
		const toastPortal = new ComponentPortal(ToastWrapperComponent, null, injector);

		overlayRef.attach(toastPortal);

	}

	private getInjector(parentInjector: Injector): PortalInjector {

		const tokens = new WeakMap();
		tokens.set(W359ToastRef, this.toastRef);
		return new PortalInjector(parentInjector, tokens);

	}

}
