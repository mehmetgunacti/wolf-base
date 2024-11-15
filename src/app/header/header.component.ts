import { coreActions } from '@actions/core.actions';
import { Component, inject, Signal } from '@angular/core';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { CloudTask } from '@models/cloud.model';
import { Store } from '@ngrx/store';
import { selCloudAvailableTasks } from '@selectors/cloud/cloud.selectors';
import { environment } from 'environments/environment';

@Component({
	standalone: true,
	imports: [ GlyphDirective ],
	selector: 'app-header',
	templateUrl: './header.component.html',
	host: {
		'class': 'flex items-center justify-between'
	}
})
export class HeaderComponent extends BaseComponent {

	private store: Store = inject(Store);

	protected cloudTasks: Signal<CloudTask[]> = this.store.selectSignal(selCloudAvailableTasks);
	protected isDev = !environment.production;

	toggleNav(): void {

		this.store.dispatch(coreActions.setNextSidebarState());

	}

}
