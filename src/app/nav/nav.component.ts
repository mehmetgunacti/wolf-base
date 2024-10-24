import { coreActions } from '@actions';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Theme } from '@constants';
import { MenuItem } from '@models';
import { Store } from '@ngrx/store';
import { selBookmarkMenuBadge, selCloudAvailableTasks, selCore_theme } from '@selectors';
import { getNextTheme } from '@utils';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { take } from 'rxjs';
import * as conf from './sidebar.conf';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [ RouterLink, RouterLinkActive, GlyphDirective, AsyncPipe, NgTemplateOutlet ],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
	host: {
		'class': 'flex flex-col'
	}
})
export class NavComponent {

	private store: Store = inject(Store);

	private bmBadge = this.store.selectSignal(selBookmarkMenuBadge);
	private cloudTasks = this.store.selectSignal(selCloudAvailableTasks);

	protected menuItemsTop = computed(() => {

		const items: MenuItem[] = [

			conf.miHome,
			conf.miBookmark(this.bmBadge()),
			conf.miNote,
			conf.miProject,
			conf.miWord,
			conf.miAnswer

		];
		return items;

	});
	protected menuItemsBottom = computed(() => {

		const items: MenuItem[] = [

			conf.miCloud(this.cloudTasks()),
			conf.miSetting,
			conf.miDatabase,
			conf.miLog,
			// conf.miTheme(this.onSwitchTheme)

		];
		return items;

	});




	onRouterLinkActive(isActive: boolean, linkElement: HTMLAnchorElement) {

		linkElement.setAttribute('tabindex', isActive ? '-1' : '0');

	}

	onSwitchTheme(): void {

		console.log('on switch theme');


		// todo move to effect
		this.store.select(selCore_theme)
			.pipe(
				take(1)
			).subscribe(
				(theme: Theme) => this.store.dispatch(coreActions.setTheme({ theme: getNextTheme(theme) }))
			);

	}

}
