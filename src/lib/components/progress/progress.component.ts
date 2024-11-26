import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [ CommonModule ],
	selector: 'w-progress',
	template: `
		<div class="absolute left-0 top-0 w-1/2 h-full bg-progress animate-loading"></div>
	`,
	host: {
		'class': 'fixed top-0 left-0 w-full h-1 bg-progress-bg overflow-hidden z-progress'
	}
})
export class ProgressComponent extends BaseComponent { }
