import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '@models';

@Component({
	selector: 'w-menu',
	standalone: true,
	imports: [ RouterModule ],
	templateUrl: './menu.component.html',
	styleUrls: [ './menu.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

	@Input() items: MenuItem[] = [];

}
