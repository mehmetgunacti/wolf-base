import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core'
import { provideRouter, RouterOutlet } from '@angular/router'
import { routes } from './app.routes'
import { provideServiceWorker } from '@angular/service-worker'
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NavOverlayComponent } from './nav-overlay/nav-overlay.component';

export const appImports = [

	RouterOutlet,

	HeaderComponent,
	NavComponent,
	NavOverlayComponent

]

export const appConfig: ApplicationConfig = {

	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		})
	]

}
