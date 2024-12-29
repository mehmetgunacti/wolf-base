import { Component, input, output } from '@angular/core';
import { BaseComponent } from '../base.component';
import { MenuItem } from '@models/menu.model';

@Component({
	selector: 'w-breadcrumb',
	templateUrl: './breadcrumb.component.html',
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
