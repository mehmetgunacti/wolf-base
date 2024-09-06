import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

/*
* sets the "required" attribute on an element
*/
@Directive({
	selector: '[formControlName],[formControl]'
})
export class RequiredValidatorDirective implements OnInit {

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private ngControl: NgControl
	) { }

	ngOnInit() {

		// Wait for the next tick to ensure the form control is properly initialized
		setTimeout(() => {

			const control = this.ngControl.control;
			if (control?.validator) {

				const validators = control.validator({} as any);
				if (validators && validators['required'])
					this.renderer.setAttribute(this.el.nativeElement, 'required', 'true');

				// do not remove, 'required' might be manually set
				// else
				// 	this.renderer.removeAttribute(this.el.nativeElement, 'required');

			}

		});

	}

}
