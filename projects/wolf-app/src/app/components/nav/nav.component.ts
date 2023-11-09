import { Component, inject } from '@angular/core';
import { MenuItem } from '@lib';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { navigate } from 'store/actions/core-navigation.actions';
import { switchTheme } from 'store/actions/core-ui.actions';
import { selBookmarksCount } from 'store/selectors/bookmark-entities.selectors';
import { selBookmarkMenuBadge } from 'store/selectors/bookmark-ui.selectors';
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
						url: '/',
						label: 'Home',
						icon: 'home'
					},
					{
						url: '/bookmarks',
						label: 'Bookmarks',
						icon: 'bookmarks',
						badge: filtered < total ? `${filtered} / ${total}` : `${total}`
					},
					{
						url: '/kb',
						label: 'Knowledge Base',
						icon: 'school'
					}

				];
				return items;

			})

		);

	}

	navTo(url: string): void {

		this.store.dispatch(navigate({ url, closeOnNavSuccess: true }));

	}

	onSwitchTheme(): void {

		this.store.dispatch(switchTheme());

	}

}

// this.navMenuItems$ = this.store.select(menuBookmarkBadge).pipe(

// 	map(bookmarkNumbers => {

// 		const menuItems: MenuItem[] = [
// 			navItems.miHome,
// 			navItems.miBookmarks(formatBadge_Bookmark(bookmarkNumbers)),
// 			navItems.miKnowledgeBase
// 		];
// 		if (this.bigScreen)
// 			return menuItems;

// 		return menuItems.map(
// 			item => ({
// 				...item,
// 				command: () => this.store.dispatch(setSidebarVisible({ visible: false }))
// 			})
// 		);

// 	})

// );
