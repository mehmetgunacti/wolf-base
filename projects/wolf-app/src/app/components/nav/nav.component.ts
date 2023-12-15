import { Component, inject } from '@angular/core';
import { MenuItem } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { switchTheme } from 'store/actions/core-ui.actions';
import { selBookmarkMenuBadge } from 'store/selectors/bookmark-selectors/bookmark-ui.selectors';
import { selCloudMenuBadgeNumbers } from 'store/selectors/cloud-ui.selectors';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent {

	private store: Store = inject(Store);

	cloudNumbers$: Observable<number[]> = this.store.select(selCloudMenuBadgeNumbers);
	menuItems$: Observable<MenuItem[]>;

	constructor() {

		this.menuItems$ = this.store.select(selBookmarkMenuBadge).pipe(

			map(([total, filtered]) => {

				const items: MenuItem[] = [
					{
						url: ['/'],
						label: 'Home',
						icon: 'home'
					},
					{
						url: ['/bookmarks'],
						queryParams: { tags: 'popular' },
						label: 'Bookmarks',
						icon: 'bookmarks',
						badge: filtered < total ? `${filtered} / ${total}` : `${total}`
					},
					{
						url: ['/notes'],
						label: 'Notes',
						icon: 'note_stack'
					},
					{
						url: ['/kb'],
						label: 'Knowledge Base',
						icon: 'school'
					}

				];
				return items;

			})

		);

	}

	onSwitchTheme(): void {

		this.store.dispatch(switchTheme());

	}

}
