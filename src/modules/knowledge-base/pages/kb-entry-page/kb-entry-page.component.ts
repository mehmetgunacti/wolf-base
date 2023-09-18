import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-page',
	templateUrl: './kb-entry-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryPageComponent {

	private store: Store = inject(Store);

	constructor() {	}

}
