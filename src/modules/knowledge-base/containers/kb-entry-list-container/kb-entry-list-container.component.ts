import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-list-container',
	templateUrl: './kb-entry-list-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryListContainerComponent {

	private store: Store = inject(Store);

	constructor() {	}

}