import { Component, inject, Signal } from '@angular/core';
import { CloudTask } from '@models';
import { Store } from '@ngrx/store';
import { GlyphComponent } from 'lib/components/glyph/glyph.component';
import { GlyphDirective } from 'lib/components/glyph/glyph.directive';
import { coreActions } from 'store/actions';
import { selCloudAvailableTasks } from 'store/selectors/cloud/cloud.selectors';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [ GlyphComponent, GlyphDirective ],
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ],
	host: {
		'class': 'flex items-center justify-between'
	}
})
export class HeaderComponent {

	private store: Store = inject(Store);

	cloudTasks: Signal<CloudTask[]> = this.store.selectSignal(selCloudAvailableTasks);

	toggleNav(): void {

		this.store.dispatch(coreActions.setNextSidebarState());

	}

}
