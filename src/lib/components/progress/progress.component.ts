import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [ CommonModule ],
	selector: 'w-progress',
	template: `
		<div class="absolute left-0 top-0 w-1/2 h-full bg-progress animate-loading"></div>
	`,
	host: {
		'class': 'fixed top-0 left-0 w-full h-1 bg-progress-bg overflow-hidden z-progress starting:opacity-0 [transition-property:display_opacity] [transition-behavior:allow-discrete] duration-500',
		'[class.hidden]': '!visible()',
		'[class.block]': 'visible()',
		'[class.opacity-100]': 'visible()',
		'[class.opacity-0]': '!visible()',
	}
})
export class ProgressComponent extends BaseComponent {

	// Input
	visible = input.required<boolean>();

}
