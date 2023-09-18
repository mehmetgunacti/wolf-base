import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-entry-form-container',
	templateUrl: './kb-entry-form-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormContainerComponent {

	private store: Store = inject(Store);

	constructor() { }

}
