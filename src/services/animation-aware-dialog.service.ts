import { animate, animateChild, keyframes, query, style, transition, trigger } from '@angular/animations';
import {
	CdkDialogContainer,
	Dialog,
	DialogConfig,
	DialogRef,
} from '@angular/cdk/dialog';
import {
	BasePortalOutlet,
	CdkPortalOutlet,
	ComponentType,
} from '@angular/cdk/portal';
import { Component, Injectable, TemplateRef } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';


const timing = '0.4s ease';

// AnimationAwareDialogContainer
export const dialogFadeOutTrigger = trigger('fadeOut', [

	transition(':leave', [

		animate(timing, keyframes([

			style({ opacity: '1' }),
			style({ opacity: '0' })

		]))

	])

]);


/**
 * Currently, when closing a dialog, the corresponding overlay is immediately
 * disposed, which means that the host element of the overlay is immediately
 * removed from the DOM using the native API.
 *
 * The current behavior completely eliminated the possibility to implement a
 * `:leave` animation for dialogs, since the ancestor element of the dialog,
 * the overlay, is removed via the native DOM API, and the Angular animation
 * engine cannot hook into this process to perform the `:leave` animation.
 *
 * This class works around the issue by waiting `:leave` animations to complete
 * before disposing the overlay.
 *
 * @see https://github.com/angular/components/issues/28878
 */
@Injectable()
export class AnimationAwareDialog extends Dialog {

	override open<R = unknown, D = unknown, C = unknown>(
		componentOrTemplateRef: ComponentType<C> | TemplateRef<C>,
		config: DialogConfig<D, DialogRef<R, C>, BasePortalOutlet> = {},
	): DialogRef<R, C> {

		if (componentOrTemplateRef instanceof TemplateRef)
			throw new Error('TemplateRef not supported');

		config.container = AnimationAwareDialogContainer;
		const ref: DialogRef<R, C> = super.open(componentOrTemplateRef, config);
		const close = ref.close.bind(ref);

		ref.close = async (...args) => {
			const container = ref.containerInstance as AnimationAwareDialogContainer;
			if (container) {

				const animationDone = firstValueFrom(container.animationDone$);
				// Detaching an overlay removes the overlay's content through standard
				// Angular APIs, so the animations can be correctly triggered.
				ref.overlayRef.detach();
				await animationDone;

			}
			close(...args);
		};
		return ref;

	}

}

@Component({
	selector: 'app-animation-aware-dialog-container',
	standalone: true,
	imports: [CdkPortalOutlet],
	template: `<ng-template cdkPortalOutlet />`,
	styles: `
	:host {
	  display: block;
	}`,
	host: {
		'[@DialogContainer]': '',
		'(@DialogContainer.done)': 'animationDone$.next()',
	},
	animations: [
		trigger('DialogContainer', [
			transition(':enter', animate(timing, keyframes([ // every dialog will have a fadeIn as :enter animation

				style({ opacity: '0' }),
				style({ opacity: '1' })

			]))),
			transition(':leave', query('@*', animateChild(), { optional: true })),
		]),
	],
})
export class AnimationAwareDialogContainer extends CdkDialogContainer {
	animationDone$ = new Subject<void>();
}
