import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry',
	templateUrl: './kb-entry.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryComponent {

	private store: Store = inject(Store);

	constructor() {	}

}