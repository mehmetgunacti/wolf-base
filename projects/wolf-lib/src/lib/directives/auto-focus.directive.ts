import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
	selector: '[autofocus]'
})
export class AutofocusDirective implements AfterContentInit {

	constructor(private el: ElementRef) { }

	ngAfterContentInit() {

		setTimeout(() => { this.el.nativeElement.focus(); }, 0);

	}

}
