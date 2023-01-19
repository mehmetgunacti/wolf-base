import { AfterViewInit, Component, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'app-portal',
	template: `
	<ng-template #pageActions>
	  <ng-content></ng-content>
	</ng-template>
	`,
	styles: []
})
export class PortalComponent implements AfterViewInit, OnDestroy {

	@ViewChild('pageActions') portalActionsTmplRef!: TemplateRef<{}>;
	private disposeFn!: () => void;
	private viewRef!: EmbeddedViewRef<{}>;

	@Input() wOutletName!: string;

	constructor(private viewContainerRef: ViewContainerRef) { }

	ngAfterViewInit(): void {

		// render the view
		this.viewRef = this.viewContainerRef.createEmbeddedView(
			this.portalActionsTmplRef
		);
		this.viewRef.detectChanges();

		// grab the DOM element
		const outletElement = document.querySelector('#' + this.wOutletName); // #portal-outlet'

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
