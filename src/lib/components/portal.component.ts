import { AfterViewInit, Component, EmbeddedViewRef, inject, input, OnDestroy, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from './base.component';

@Component({
	selector: 'w-portal',
	standalone: true,
	template: `
		<ng-template #pageActions>
			<ng-content/>
		</ng-template>
	`,
	host: {
		'class': 'contents'
	}
})
export class PortalComponent extends BaseComponent implements AfterViewInit, OnDestroy {

	portalActionsTmplRef = viewChild.required<TemplateRef<{}>>('pageActions');
	private disposeFn!: () => void;
	private viewRef!: EmbeddedViewRef<{}>;
	private viewContainerRef = inject(ViewContainerRef);

	outletName = input('portal-outlet');  // | 'portal-outlet-right';

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
		if (index !== -1) {
			this.viewContainerRef.remove(index);
		}

	}

}
