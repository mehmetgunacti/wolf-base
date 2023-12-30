import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'lib/models';

@Component({
	selector: 'w-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {

	@Input() items: MenuItem[] = [];
	@Input() home: string[] = [];

	@Output() clicked: EventEmitter<string[]> = new EventEmitter();


	onClick(urls: string[]): void {

		this.clicked.emit(urls);

	}

}
