import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MenuItem } from 'lib/models';

@Component({
	selector: 'w-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
	host: { 'class': 'box dark' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {

	items = input.required<MenuItem[]>();
	home = input<string[]>([]);

	clicked = output<string[]>();

	onClick(urls: string[]): void {

		this.clicked.emit(urls);

	}

}
