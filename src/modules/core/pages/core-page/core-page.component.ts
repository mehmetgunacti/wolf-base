import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { THEME } from 'lib';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import * as fromBookmark from 'store/bookmark/selectors';
import * as actions from 'store/core/actions';
import * as selectors from 'store/core/selectors';
import * as navItems from '../../navigation-menu-items';

@Component({
	selector: 'app-core-page',
	templateUrl: './core-page.component.html'
})
export class CorePageComponent implements OnDestroy {

	navMenuItems$: Observable<MenuItem[]>;
	theme$: Observable<THEME>;

	subscriptions = new Subscription();

	@HostBinding('class.bigScreen')
	bigScreen = true;

	@HostBinding('class.navCollapsed')
	navCollapsed = true;

	constructor(
		private store: Store
	) {

		this.subscriptions.add(

			this.store.select(selectors.isBigScreen).subscribe(
				result => this.bigScreen = result
			)

		);

		this.subscriptions.add(

			store.select(selectors.isSidebarVisible).subscribe(
				visible => this.navCollapsed = !visible
			)

		);

		this.navMenuItems$ = combineLatest([
			store.select(fromBookmark.filteredBookmarkCount),
			store.select(fromBookmark.bookmarksCount)
		]).pipe(

			map(([selected, total]) => {

				const menuItems: Array<MenuItem> = new Array();
				menuItems.push(navItems.miHome);
				menuItems.push(navItems.miBookmarks(selected < total ? `${ selected}/${ total }` : `${ total }`));
				menuItems.push(navItems.miSettings);
				return menuItems;

			})

		);
		this.theme$ = store.select(selectors.theme);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	toggleNav(): void {

		// navCollapsed is always the opposite of 'visible', no negation needed
		this.store.dispatch(actions.setSidebarVisible({ visible: this.navCollapsed }));

	}

	onThemeChange(theme: THEME): void {

		this.store.dispatch(actions.themeSet({ theme }));

	}

}
