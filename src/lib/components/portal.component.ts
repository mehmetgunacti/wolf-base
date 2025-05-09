import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, EmbeddedViewRef, inject, input, OnDestroy, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
	selector: 'w-portal',
	template: `
		<ng-template #outlet>
			<ng-content/>
		</ng-template>
	`,
	host: { 'class': 'contents' }
})
export class PortalComponent extends BaseComponent implements AfterViewInit, OnDestroy {

	private document = inject(DOCUMENT);
	private viewContainerRef = inject(ViewContainerRef);
	private outletTemplateRef = viewChild.required<TemplateRef<{}>>('outlet');
	private viewRef!: EmbeddedViewRef<{}>;

	// Input
	outletName = input<'portal-outlet' | 'dialog-header-outlet' | 'dialog-footer-outlet'>('portal-outlet');
	replaceContent = input<boolean>(true);
	delayRemoval = input<number>(0);

	ngAfterViewInit(): void {

		// render the view
		this.viewRef = this.viewContainerRef.createEmbeddedView(
			this.outletTemplateRef()
		);
		this.viewRef.detectChanges();

		// search for outlets
		// Important: when used with w-modal there might be several instances found
		// Happens when you close a modal and immediately open another one -> there's a 2s delay before removal from DOM
		// (see @delayDestroy on modal)
		const outletElements = this.document.querySelectorAll('#' + this.outletName()); // #portal-outlet'

		// just in case there's more than one instance, we take the last one found
		const outletElement = outletElements[ outletElements.length - 1 ];

		// setting innerHTML remove all nodes
		if (this.replaceContent())
			outletElement.innerHTML = '';

		// attach the view to the DOM element that matches our selector
		this.viewRef.rootNodes.forEach(
			rootNode => outletElement?.appendChild(rootNode)
		);

	}

	ngOnDestroy(): void {

		const index = this.viewContainerRef.indexOf(this.viewRef);
		if (index !== -1) {

			if (this.delayRemoval() > 0)
				// when used inside w-modal, the destruction of the modal takes 2s
				// using setTimeout prevents UI changes before the modal's fade out animation start
				setTimeout(() => this.viewContainerRef.remove(index), 0);
			else
				this.viewContainerRef.remove(index);

		}

	}

}
