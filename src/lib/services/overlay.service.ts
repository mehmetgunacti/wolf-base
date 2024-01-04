import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, Type } from '@angular/core';

export type OVERLAY_ID = number;

export interface OverlayDialogConfig<T> {

	panelClass?: string;
	hasBackdrop?: boolean;
	backdropClass?: string;
	data?: T | null;
	cleanupFn?: () => void;

}

export const DEFAULT_CONFIG: OverlayDialogConfig<any> = {

	panelClass: 'custom-panel-class',
	hasBackdrop: true,
	backdropClass: 'cdk-overlay-dark-backdrop'

};

const W_DIALOG_DATA = new InjectionToken('W_DIALOG_DATA');
const W_REMOTE_CONTROL = new InjectionToken('RemoteControl');

@Injectable()
export class WOverlayService {

	private idCounter: OVERLAY_ID = 0;
	private mapRemoteControls: Map<OVERLAY_ID, OverlayRef> = new Map();

	// Inject overlay service
	constructor(
		private injector: Injector,
		private overlay: Overlay
	) { }

	private createInjector<T>(config: OverlayDialogConfig<T>, overlayRef: OverlayRef): Injector {

		// Set custom injection tokens
		const providers = [

			{ provide: W_REMOTE_CONTROL, useValue: overlayRef },
			{ provide: W_DIALOG_DATA, useValue: config.data }

		];

		// Instantiate new Injector
		return Injector.create({ providers, parent: this.injector });

	}

	private getOverlayConfig<T>(config: OverlayDialogConfig<T>): OverlayConfig {

		const positionStrategy: GlobalPositionStrategy =
			this.overlay
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

	open<T>(componentClass: Type<any>, config: OverlayDialogConfig<T> = { data: null }): OVERLAY_ID {

		const id = this.idCounter++;
		const overlayRef: OverlayRef = this.overlay.create(this.getOverlayConfig({ ...DEFAULT_CONFIG, ...config }));
		const portalInjector = this.createInjector(config, overlayRef);
		const componentPortal = new ComponentPortal(componentClass, null, portalInjector);
		overlayRef.attach(componentPortal);
		overlayRef.backdropClick().subscribe(() => {

			if (config.cleanupFn)
				config.cleanupFn();

		});
		this.mapRemoteControls.set(id, overlayRef);
		return id;

	}

	close(id: OVERLAY_ID): void {

		const overlayRef = this.mapRemoteControls.get(id);
		if (overlayRef) {

			overlayRef.dispose();
			this.mapRemoteControls.delete(id);

		}

	}

}
