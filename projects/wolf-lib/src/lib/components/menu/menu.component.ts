import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

export interface MenuItem {

	url: string;
	label: string;
	icon?: string;
	badge?: string;

}

@Component({
	selector: 'w-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

	@Output() clicked: EventEmitter<string> = new EventEmitter();

	onClick(url: string): void {

		this.clicked.emit(url);

	}

	items: MenuItem[] = [
		{
			url: '/home',
			label: 'Home',
			icon: 'home'
		},
		{
			url: '/bookmarks',
			label: 'Bookmarks',
			icon: 'bookmarks',
			badge: '470'
		},
		{
			url: '/kb',
			label: 'Knowledge Base',
			icon: 'school'
		},

	];

}
