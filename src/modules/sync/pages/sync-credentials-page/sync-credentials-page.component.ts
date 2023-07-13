import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from 'lib';
import { Observable } from 'rxjs';
import { getCredentials, navigate, saveCredentials } from 'store/core';

@Component({
	selector: 'app-sync-credentials-page',
	templateUrl: './sync-credentials-page.component.html'
})
export class SyncCredentialsPageComponent {

	private store: Store = inject(Store);

	credentials$: Observable<Credentials>;

	constructor() {

		this.credentials$ = this.store.select(getCredentials);

	}

	onSave(credentials: Credentials): void {

		this.store.dispatch(saveCredentials({ credentials }));

	}

	onCancel(): void {

		this.store.dispatch(navigate({ url: '/sync' }));

	}

}