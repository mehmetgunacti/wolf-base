import { AfterViewInit, Component, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'w-portal',
	standalone: true,
	template: `
		<ng-template #pageActions>
			<ng-content/>
		</ng-template>
	`,
	styles: [':host { position: absolute; }']
})
export class PortalComponent implements AfterViewInit, OnDestroy {

	@ViewChild('pageActions') portalActionsTmplRef!: TemplateRef<{}>;
	private disposeFn!: () => void;
	private viewRef!: EmbeddedViewRef<{}>;

	@Input() outletName: 'portal-outlet' = 'portal-outlet'; // | 'portal-outlet-right';

	constructor(private viewContainerRef: ViewContainerRef) { }

	ngAfterViewInit(): void {

		// render the view
		this.viewRef = this.viewContainerRef.createEmbeddedView(
			this.portalActionsTmplRef
		);
		this.viewRef.detectChanges();

		// grab the DOM element
		const outletElement = document.querySelector('#' + this.outletName); // #portal-outlet'

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
