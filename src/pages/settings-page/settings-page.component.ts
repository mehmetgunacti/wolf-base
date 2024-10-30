import { AsyncPipe, DatePipe, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import * as container from '@containers';
import { AlertComponent, GlyphDirective, PortalComponent } from '@libComponents';
import { catchError, defer, EMPTY, from, Observable } from 'rxjs';
import { buildInfo } from 'version';

@Component({
	selector: 'app-settings-page',
	standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		GlyphDirective,
		PortalComponent,
		AlertComponent,
		RouterLink,
		container.FirestoreConfigContainerComponent,
		container.TitleLookupConfigContainerComponent,
		container.PinnedNotesFormContainerComponent,
		container.PopularBookmarksFormContainerComponent
	],
	templateUrl: './settings-page.component.html',
	host: {
		'class': 'page'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
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
