import { Directive, ElementRef, AfterContentInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
	selector: '[autofocus]'
})
export class AutofocusDirective implements OnChanges, AfterContentInit {

	@Input() autofocus: boolean = false;
	@Input() after = 400;

	constructor(private el: ElementRef) { }

	ngOnChanges(changes: SimpleChanges) {

		if (changes['autofocus']?.currentValue)
			setTimeout(() => { this.el.nativeElement.focus(); }, this.after);

	}

	ngAfterContentInit() {

		// setTimeout(() => { this.el.nativeElement.focus(); }, 0);

	}

}
