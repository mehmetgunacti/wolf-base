import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '@models';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-menu',
	standalone: true,
	imports: [ RouterModule ],
	templateUrl: './menu.component.html',
	styleUrls: [ './menu.component.scss' ]
})
export class MenuComponent extends BaseComponent {

	@Input() items: MenuItem[] = [];

}
