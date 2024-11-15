import { AsyncPipe, DatePipe, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { FirestoreConfigContainer } from '@containers/firestore-config/firestore-config.container';
import { PinnedNotesFormContainer } from '@containers/pinned-notes-form/pinned-notes-form.container';
import { PopularBookmarksFormContainer } from '@containers/popular-bookmarks-form/popular-bookmarks-form.container';
import { TitleLookupConfigContainer } from '@containers/title-lookup-config/title-lookup-config.container';
import { GlyphDirective } from '@directives/glyph.directive';
import { AlertComponent } from '@libComponents/alert/alert.component';
import { BaseComponent } from '@libComponents/base.component';
import { PortalComponent } from '@libComponents/portal.component';
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
		FirestoreConfigContainer,
		TitleLookupConfigContainer,
		PinnedNotesFormContainer,
		PopularBookmarksFormContainer
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

			<w-alert severity="warn" glyph="cloud_download" summary="Update available">
				<button class="btn btn-ghost" (click)="onUpdateApp()">Update</button>
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
	host: { 'class': 'page' }
})
export class SettingsPage extends BaseComponent {

	builtTime = buildInfo.builtTime;
	builtVersion = buildInfo.version;
	builtNumber = buildInfo.builtNumber;

	updateAvailable$: Observable<boolean>;

	private updates: SwUpdate = inject(SwUpdate);
	private document: Document = inject(DOCUMENT);

	constructor() {

		super();
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
