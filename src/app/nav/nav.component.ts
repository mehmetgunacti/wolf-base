import { coreActions } from '@actions/core.actions';
import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { MenuItem } from '@models/menu.model';
import { Store } from '@ngrx/store';
import { selBookmark_menuBadge } from '@selectors/bookmark/bookmark-ui.selectors';
import { selCloudAvailableTasks } from '@selectors/cloud/cloud.selectors';
import * as conf from './sidebar.conf';

@Component({
	standalone: true,
	imports: [ RouterLink, RouterLinkActive, GlyphDirective, NgTemplateOutlet ],
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	host: {
		'class': 'flex flex-col'
	}
})
export class NavComponent extends BaseComponent {

	private store: Store = inject(Store);

	private bmBadge = this.store.selectSignal(selBookmark_menuBadge);
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
