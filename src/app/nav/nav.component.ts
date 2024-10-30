import { coreActions } from '@actions';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GlyphDirective } from '@directive';
import { BaseComponent } from '@libComponents';
import { MenuItem } from '@models';
import { Store } from '@ngrx/store';
import { selBookmarkMenuBadge, selCloudAvailableTasks } from '@selectors';
import * as conf from './sidebar.conf';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [ RouterLink, RouterLinkActive, GlyphDirective, AsyncPipe, NgTemplateOutlet, NgClass ],
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
	host: {
		'class': 'flex flex-col'
	}
})
export class NavComponent extends BaseComponent {

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
			conf.miLog

		];
		return items;

	});

	onSwitchTheme(): void {

		this.store.dispatch(coreActions.setNextTheme());

	}

}
