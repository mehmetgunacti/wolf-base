import { AfterViewInit, Component, EmbeddedViewRef, inject, input, OnDestroy, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
	standalone: true,
	selector: 'w-portal',
	template: `
		<ng-template #pageActions>
			<ng-content/>
		</ng-template>
	`,
	host: { 'class': 'contents' }
})
export class PortalComponent extends BaseComponent implements AfterViewInit, OnDestroy {

	private portalActionsTmplRef = viewChild.required<TemplateRef<{}>>('pageActions');
	private viewContainerRef = inject(ViewContainerRef);
	private viewRef!: EmbeddedViewRef<{}>;
	private disposeFn!: () => void;

	outletName = input<'portal-outlet' | 'dialog-header-outlet' | 'dialog-footer-outlet'>('portal-outlet');

	ngAfterViewInit(): void {

		// render the view
		this.viewRef = this.viewContainerRef.createEmbeddedView(
			this.portalActionsTmplRef()
		);
		this.viewRef.detectChanges();

		// grab the DOM element
		const outletElement = document.querySelector('#' + this.outletName()); // #portal-outlet'

		// attach the view to the DOM element that matches our selector
		this.viewRef.rootNodes.forEach(rootNode =>
			outletElement?.appendChild(rootNode)
		);

		// register a dispose fn we can call later
		// to remove the content from the DOM again
		this.disposeFn = () => { };

	}

	ngOnDestroy(): void {

		const index = this.viewContainerRef.indexOf(this.viewRef);
		if (index !== -1)
			this.viewContainerRef.remove(index);

	}

}
