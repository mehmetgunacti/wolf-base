import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { setSidebarVisible, switchTheme } from 'store/actions/core-ui.actions';
import { menuBookmarkBadge, menuSyncableItemsCount } from 'store/selectors/bookmark-ui.selectors';
import { isSidebarVisible, isThemeDark } from 'store/selectors/core-configuration.selectors';
import { isBigScreen } from 'store/selectors/core-ui.selectors';
import { buildInfo } from 'version';
import * as navItems from '../../navigation-menu-items';

@Component({
	selector: 'app-core-page',
	templateUrl: './core-page.component.html'
})
export class CorePageComponent implements OnDestroy {

	navMenuItems$: Observable<MenuItem[]>;
	isThemeDark$: Observable<boolean>;
	syncableItemsCount$: Observable<number>;

	subscriptions = new Subscription();

	@HostBinding('class.bigScreen')
	bigScreen = true;

	@HostBinding('class.navCollapsed')
	navCollapsed = true;

	builtTime = buildInfo.builtTime;
	builtVersion = buildInfo.version;
	builtNumber = buildInfo.builtNumber;

	constructor(
		private store: Store
	) {

		this.subscriptions.add(

			this.store.select(isBigScreen).subscribe(
				result => this.bigScreen = result
			)

		);

		this.subscriptions.add(

			store.select(isSidebarVisible).subscribe(
				visible => this.navCollapsed = !visible
			)

		);

		this.syncableItemsCount$ = this.store.select(menuSyncableItemsCount);

		this.navMenuItems$ = combineLatest([
			this.store.select(menuBookmarkBadge),
			this.syncableItemsCount$
		]).pipe(

			map(([bookmarkBadge, syncableCount]) => {

				const menuItems: Array<MenuItem> = new Array();
				menuItems.push(navItems.miHome);
				menuItems.push(navItems.miBookmarks(bookmarkBadge));
				menuItems.push(navItems.miDatabase);
				menuItems.push(navItems.miSync(syncableCount > 0 ? `${syncableCount}` : undefined));
				menuItems.push(navItems.miSettings);
				return menuItems;

			})

		);
		this.isThemeDark$ = store.select(isThemeDark);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	toggleNav(): void {

		// navCollapsed is always the opposite of 'visible', no negation needed
		this.store.dispatch(setSidebarVisible({ visible: this.navCollapsed }));

	}

	onSwitchTheme(): void {

		this.store.dispatch(switchTheme());

	}

}
