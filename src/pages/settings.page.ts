import { AsyncPipe, DatePipe, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import * as container from '@containers';
import { AlertComponent, GlyphDirective, PortalComponent } from '@libComponents';
import { catchError, defer, EMPTY, from, Observable } from 'rxjs';
import { buildInfo } from 'version';

@Component({
	selector: 'settings-page',
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
	template: `
		<w-portal>

			<button
				class="btn btn-ghost"
				routerLink="components">
				<svg wGlyph="grid_view"></svg>
				Components
			</button>

		</w-portal>

		@if (updateAvailable$ | async) {

			<w-alert severity="warn">

				<span>Update available</span>
				<button class="btn btn-ghost" (click)="onUpdateApp()" data-after="Update">
					<svg wGlyph="update"></svg>
				</button>

			</w-alert>

		}
		<!-- <app-quote-settings-container/> -->
		<app-firestore-config-container/>
		<app-title-lookup-config-container/>
		<app-pinned-notes-form-container/>
		<app-popular-bookmarks-form-container/>
		<div class="flex justify-end items-center p-4 text-base-color-secondary comp">
			<small>v{{ builtVersion }} (#{{ builtNumber }}) {{ builtTime | date:'dd.MM.yyyy HH:mm:ss' }}</small>
		</div>
	`,
	host: { 'class': 'page' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {

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
