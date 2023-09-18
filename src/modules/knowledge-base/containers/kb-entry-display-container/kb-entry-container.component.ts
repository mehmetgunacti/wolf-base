import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-container',
	templateUrl: './kb-entry-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryContainerComponent {

	private store: Store = inject(Store);

	constructor() {	}

}