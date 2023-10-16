import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: '[inputElement]'
})
export class InputElementDirective implements OnInit {

	@Input({
		alias: 'focused',
		transform: (value: string) => value === 'always'
	})
	alwaysFocused: boolean = false;

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {

		this.renderer.addClass(this.el.nativeElement, 'input-element');
		if (this.alwaysFocused)
			this.renderer.addClass(this.el.nativeElement, 'focus');

	}

	@HostListener('focus')
	onFocus() {

		if (!this.alwaysFocused)
			this.renderer.addClass(this.el.nativeElement, 'focus');

	}

	@HostListener('blur')
	onBlur() {

		if (!this.alwaysFocused)
			if (!this.el.nativeElement.value)
				this.renderer.removeClass(this.el.nativeElement, 'focus');

	}

	@HostListener('input')
	onInput() {

		if (!this.alwaysFocused)
			if (this.el.nativeElement.value)
				this.renderer.addClass(this.el.nativeElement, 'focus');
			else
				this.renderer.removeClass(this.el.nativeElement, 'focus');

	}

}
