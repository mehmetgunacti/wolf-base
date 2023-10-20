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

	ngOnInit(): void {

		this.renderer.addClass(this.el.nativeElement, 'input-element');
		if (!!this.el.nativeElement.value)
			this.addClassFocus();

		if (this.alwaysFocused)
			this.addClassFocus();

	}

	@HostListener('focus')
	onFocus() {

		if (!this.alwaysFocused)
			this.addClassFocus();

	}

	@HostListener('blur')
	onBlur() {

		if (!this.alwaysFocused)
			if (!this.el.nativeElement.value)
				this.removeClassFocus();

	}

	@HostListener('input')
	onInput() {

		if (!this.alwaysFocused)
			if (this.el.nativeElement.value)
				this.addClassFocus()
			else
				this.removeClassFocus()

	}

	private addClassFocus(): void {

		this.renderer.addClass(this.el.nativeElement, 'focus');

	}

	private removeClassFocus(): void {

		this.renderer.removeClass(this.el.nativeElement, 'focus');

	}

}
