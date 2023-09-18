import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-content-form-container',
	templateUrl: './kb-content-form-container.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBContentFormContainerComponent {

	private store: Store = inject(Store);

	constructor() {	}

}
