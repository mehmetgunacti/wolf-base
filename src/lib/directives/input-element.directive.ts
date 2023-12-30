import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[inputElement]'
})
export class InputElementDirective implements OnInit {

	@Input({
		alias: 'focused',
		transform: (value: string) => value === 'always'
	})
	alwaysFocused: boolean = false;

	@Input({ alias: 'formControl' }) control!: FormControl;

	@HostBinding('class.has-focus') focused = false;
	@HostBinding('class.has-error') hasError = false;
	@HostBinding('class.input-element') inputElement = true;

	private subscriptions: Subscription = new Subscription();

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit(): void {

		this.subscriptions.add(

			this.control.valueChanges.subscribe(

				// a => console.log(a)

			)

		);

		this.subscriptions.add(

			this.control.statusChanges.subscribe(

				status => this.hasError = status === 'INVALID' && this.control.dirty

			)

		);


		// this.renderer.addClass(this.el.nativeElement, 'input-element');
		if (!!this.el.nativeElement.value)
			this.focused = true;
		// this.addClass('focus');

		if (this.alwaysFocused)
			this.focused = false;
		// this.addClass('focus');

	}

	@HostListener('focus')
	onFocus() {

		// if (!this.alwaysFocused)
		this.focused = true;
		// this.addClass('focus');

	}

	@HostListener('blur')
	onBlur() {

		// if (!this.alwaysFocused)
		// 	if (!this.el.nativeElement.value)
		this.focused = !!this.control.value;
		// this.removeClass('focus');

	}

	@HostListener('input')
	onInput() {

		if (!this.alwaysFocused)
			if (this.el.nativeElement.value)
				this.focused = true;
			// this.addClass('focus')
			else
				this.focused = false;
		// this.removeClass('focus')

	}

	private addClass(name: string): void {

		this.renderer.addClass(this.el.nativeElement, name);

	}

	private removeClass(name: string): void {

		this.renderer.removeClass(this.el.nativeElement, name);

	}

}
