import { Component, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	standalone: true,
	imports: [],
	selector: 'w-choices-viewer',
	templateUrl: './choices-viewer.component.html',
	host: {
		'class': 'inline-flex px-2 items-center relative border border-transparent rounded-lg group'
	}
})
export class ChoicesViewerComponent extends BaseComponent {

	protected readonly ALPHA = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

	// Input
	answers = input.required<boolean[]>();

}
