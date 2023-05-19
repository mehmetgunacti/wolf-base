import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeInfo } from 'lib';
import { MenuItem } from 'primeng/api';
import { Observable, of, Subscription } from 'rxjs';
import * as actions from 'store/actions';
import * as selectors from 'store/selectors';
import * as navItems from '../../navigation-menu-items';

@Component({
	selector: 'app-core-page',
	templateUrl: './core-page.component.html'
})
export class CorePageComponent implements OnDestroy {

	navMenuItems$: Observable<MenuItem[]>;
	theme$: Observable<ThemeInfo>;

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

		const items: Array<MenuItem> = new Array();
		items.push(navItems.miBookmarks);
		items.push(navItems.miSettings);
		// items.push(navItems.miNotes);
		// items.push(navItems.miWikis);
		// items.push(navItems.miTasks);
		// items.push(navItems.miFasts);
		// items.push(navItems.miWords);
		this.navMenuItems$ = of(items);

		this.theme$ = store.select(selectors.themeInfo);

	}

	ngOnDestroy(): void {

		this.subscriptions.unsubscribe();

	}

	toggleNav(): void {

		// navCollapsed is always the opposite of 'visible', no negation needed
		this.store.dispatch(actions.setSidebarVisible({ visible: this.navCollapsed }));

	}

	onThemeChange(newTheme: ThemeInfo): void {

		this.store.dispatch(actions.themeSet({ newTheme }));

	}

}
