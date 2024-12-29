import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BaseComponent } from '@libComponents/base.component';

@Component({
	imports: [CommonModule],
	selector: 'w-choices-viewer',
	templateUrl: './choices-viewer.component.html',
	host: {
		'class': 'block px-2 border border-transparent rounded-lg'
	}
})
export class ChoicesViewerComponent extends BaseComponent {

	protected readonly ALPHA = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

	// Input
	answers = input.required<boolean[]>();
	correctAnswers = input<boolean[] | null>(null);

}
