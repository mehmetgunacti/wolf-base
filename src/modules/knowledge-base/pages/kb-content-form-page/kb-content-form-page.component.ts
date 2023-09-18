import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-kb-content-form-page',
	templateUrl: './kb-content-form-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBContentFormPageComponent {

	private store: Store = inject(Store);

	constructor() {	}

}
