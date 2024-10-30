import { Component, input, output } from '@angular/core';
import { MenuItem } from '@models';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-breadcrumb',
	standalone: true,
	templateUrl: './breadcrumb.component.html',
	styleUrls: [ './breadcrumb.component.scss' ],
	host: { 'class': 'box dark' }
})
export class BreadcrumbComponent extends BaseComponent {

	items = input.required<MenuItem[]>();
	home = input<string[]>([]);

	clicked = output<string[]>();

	onClick(urls: string[]): void {

		this.clicked.emit(urls);

	}

}
