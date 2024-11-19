import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, createComponent, EmbeddedViewRef, inject, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ComponentService {

	private applicationRef = inject(ApplicationRef);
	private injector = inject(Injector);
	private document = inject(DOCUMENT);

	createInContainer(
		component: Type<any>,
		container: ViewContainerRef,
		inputs?: { [ key: string ]: any; }
	): ComponentRef<any> {

		// Clear container if needed
		container.clear();

		// Create component directly without factory resolution
		const componentRef = container.createComponent(component);

		// Set inputs if provided
		if (inputs)
			Object.keys(inputs).forEach(
				key => componentRef.setInput(key, inputs[ key ])
			);

		return componentRef;

	}

	// Alternative method for creating in the body
	createInBody<T>(
		component: Type<T>,
		inputs?: { [ key: string ]: any; }
	): ComponentRef<T> {

		// Create component
		const componentRef = createComponent(component, {
			environmentInjector: this.applicationRef.injector,
			elementInjector: this.injector
		});

		// Set inputs if provided
		if (inputs)
			Object.keys(inputs).forEach(
				key => componentRef.setInput(key, inputs[ key ])
			);

		// Attach to DOM
		const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[ 0 ] as HTMLElement;
		this.document.body.appendChild(domElem);

		// Attach to the change detection
		this.applicationRef.attachView(componentRef.hostView);

		return componentRef;

	}

}
