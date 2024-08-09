import { Directive, effect, ElementRef, inject, input, OnInit } from '@angular/core';
import { UUID } from 'lib/constants';

@Directive({
	selector: '[slowScroll]'
})
export class SlowScrollDirective implements OnInit {

	scrollTrigger = input<UUID>();
	scrollStep = input(1);
	scrollInterval = input(50);

	private element: HTMLElement;
	private scrollTimer: any;

	private el: ElementRef = inject(ElementRef);

	constructor() {

		this.element = this.el.nativeElement;

		effect(() => this.startSlowScroll(this.scrollTrigger()));

	}

	ngOnInit() {

		this.startSlowScroll();

	}

	startSlowScroll(id?: UUID) {

		let scrollAmount = 0;
		this.element.scrollTop = 0;

		this.scrollTimer = setInterval(() => {

			const distance = this.element.scrollHeight - this.element.clientHeight;
			// console.log('scrolling', distance);
			// console.log('interval', scrollAmount, distance, scrollAmount < distance);

			if (scrollAmount < distance) {

				// console.log('1', this.element.scrollTop, scrollAmount);
				this.element.scrollTop += this.scrollStep();
				scrollAmount += this.scrollStep();
				// console.log('2', this.element.scrollTop, scrollAmount);


			} else
				clearInterval(this.scrollTimer);

		}, this.scrollInterval());

	}

	ngOnDestroy() {

		if (this.scrollTimer)
			clearInterval(this.scrollTimer);

	}

}
