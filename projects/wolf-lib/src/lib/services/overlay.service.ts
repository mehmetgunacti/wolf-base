import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, Type } from '@angular/core';

export interface IOverlayDialogConfig<T> {
	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	data?: T | null;
}

export const DEFAULT_CONFIG: IOverlayDialogConfig<any> = {

	panelClass: 'custom-panel-class',
	hasBackdrop: true,
	backdropClass: 'custom-backdrop-class'

};

export interface IRemoteControl {

	close(): void;

}

export class RemoteControl implements IRemoteControl {

	constructor(private overlayRef: OverlayRef) { }

	close(): void {
		this.overlayRef.dispose();
	}

}

export const W_DIALOG_DATA = new InjectionToken('W_DIALOG_DATA');

@Injectable()
export class WOverlayService {

	// Inject overlay service
	constructor(
		private injector: Injector,
		private overlay: Overlay
	) { }

	private createInjector<T>(config: IOverlayDialogConfig<T>, remoteControl: IRemoteControl): Injector {

		// Set custom injection tokens
		const providers = [

			{ provide: RemoteControl, useValue: remoteControl },
			{ provide: W_DIALOG_DATA, useValue: config.data }

		];

		// Instantiate new Injector
		return Injector.create({ providers, parent: this.injector });

	}

	private getOverlayConfig<T>(config: IOverlayDialogConfig<T>): OverlayConfig {

		const positionStrategy: GlobalPositionStrategy = this.overlay
			.position()
			.global()
			.centerHorizontally()
			.centerVertically();

		return new OverlayConfig({
			hasBackdrop: config.hasBackdrop,
			backdropClass: config.backdropClass,
			panelClass: config.panelClass,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy
		});

	}

	// tslint:disable-next-line: no-any
	open<T>(componentClass: Type<any>, config: IOverlayDialogConfig<T> = { data: null }): IRemoteControl {

		const overlayRef: OverlayRef = this.overlay.create(this.getOverlayConfig({ ...DEFAULT_CONFIG, ...config }));
		const remoteControl = new RemoteControl(overlayRef);
		const portalInjector = this.createInjector(config, remoteControl);
		const componentPortal = new ComponentPortal(componentClass, null, portalInjector);
		overlayRef.attach(componentPortal);
		overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
		return remoteControl;

	}

}
