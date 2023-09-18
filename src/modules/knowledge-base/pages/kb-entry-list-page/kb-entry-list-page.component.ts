import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-list-page',
	templateUrl: './kb-entry-list-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryListPageComponent {

	private store: Store = inject(Store);

	constructor() {	}

}
