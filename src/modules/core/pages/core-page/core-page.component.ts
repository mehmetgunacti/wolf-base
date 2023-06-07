import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import * as fromBookmark from 'store/bookmark/selectors';
import * as actions from 'store/core/actions';
import * as selectors from 'store/core/selectors';
import * as navItems from '../../navigation-menu-items';
import { buildInfo } from 'version';

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

			this.store.select(selectors.isBigScreen).subscribe(
				result => this.bigScreen = result
			)

		);

		this.subscriptions.add(

			store.select(selectors.isSidebarVisible).subscribe(
				visible => this.navCollapsed = !visible
			)

		);

		this.syncableItemsCount$ = this.store.select(fromBookmark.menuSyncableItemsCount);

		this.navMenuItems$ = combineLatest([
			this.store.select(fromBookmark.menuBookmarkBadge),
			this.syncableItemsCount$
		]).pipe(

			map(([bookmarkBadge, syncableCount]) => {

				const menuItems: Array<MenuItem> = new Array();
				menuItems.push(navItems.miHome);
				menuItems.push(navItems.miBookmarks(bookmarkBadge));
				menuItems.push(navItems.miSettings);
				menuItems.push(navItems.miSync(syncableCount > 0 ? `${syncableCount}`: undefined));
				return menuItems;

			})

		);
		this.isThemeDark$ = store.select(selectors.isThemeDark);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	toggleNav(): void {

		// navCollapsed is always the opposite of 'visible', no negation needed
		this.store.dispatch(actions.setSidebarVisible({ visible: this.navCollapsed }));

	}

	onSwitchTheme(): void {

		this.store.dispatch(actions.switchTheme());

	}

}
