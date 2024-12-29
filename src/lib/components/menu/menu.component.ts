import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from '@models/menu.model';
import { BaseComponent } from '../base.component';

@Component({
	selector: 'w-menu',
	imports: [ RouterModule ],
	templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent {

	@Input() items: MenuItem[] = [];

}
