import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '@models';

@Component({
	selector: 'w-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

	@Input() items: MenuItem[] = [];

}
