import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'lib/models';

@Component({
	selector: 'w-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

	@Input() items: MenuItem[] = [];

	@Output() clicked: EventEmitter<string> = new EventEmitter();

	onClick(url: string): void {

		this.clicked.emit(url);

	}

}
