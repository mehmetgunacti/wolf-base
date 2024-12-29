import { Component, input, output } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	selector: 'app-nav-overlay',
	template: '',
	host: {
		'(click)': 'onClick()',
		'class': 'fixed top-0 right-0 h-100dvh left-0 backdrop-blur bg-overlay z-nav-overlay starting:opacity-0 [transition-property:display_opacity] [transition-behavior:allow-discrete] duration-500',
		'[class.hidden]': '!visible()',
		'[class.block]': 'visible()',
		'[class.opacity-100]': 'visible()',
		'[class.opacity-0]': '!visible()',
	}
})
export class NavOverlayComponent extends BaseComponent {

	// Input
	visible = input.required<boolean>();

	// Output
	close = output<void>();

	onClick(): void {

		this.close.emit();

	}

}
