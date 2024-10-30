import { Component, inject, Signal } from '@angular/core';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { CloudTask } from '@models';
import { Store } from '@ngrx/store';
import { selCloudAvailableTasks } from '@selectors';
import { coreActions } from 'store/actions';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [ GlyphDirective ],
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ],
	host: {
		'class': 'flex items-center justify-between'
	}
})
export class HeaderComponent extends BaseComponent {

	private store: Store = inject(Store);

	cloudTasks: Signal<CloudTask[]> = this.store.selectSignal(selCloudAvailableTasks);

	toggleNav(): void {

		this.store.dispatch(coreActions.setNextSidebarState());

	}

}
