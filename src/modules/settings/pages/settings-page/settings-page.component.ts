import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { EMPTY, Observable, catchError, defer, from } from 'rxjs';
import { buildInfo } from 'version';

@Component({
	selector: 'app-settings-page',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

	builtTime = buildInfo.builtTime;
	builtVersion = buildInfo.version;
	builtNumber = buildInfo.builtNumber;

	updateAvailable$: Observable<boolean>;

	private updates: SwUpdate = inject(SwUpdate);
	private document: Document = inject(DOCUMENT);

	constructor() {

		this.updateAvailable$ = defer(() => from(this.updates.checkForUpdate())).pipe(

			catchError((err) => {

				console.warn('An error occurred while checking for updates:', err);
				return EMPTY;

			})

		);

	}

	onUpdateApp(): void {

		this.updates.activateUpdate().then(() => this.document.location.reload());

	}

}
