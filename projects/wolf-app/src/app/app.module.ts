import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import * as store from 'store/store.config';
import { AppComponent } from './app.component';
import * as config from './app.config';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { NavOverlayComponent } from './components/nav-overlay/nav-overlay.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavComponent,
		NavOverlayComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(config.routes),
		StoreModule.forRoot(store.reducers, { metaReducers: store.metaReducers }),
		EffectsModule.forRoot(store.effects),
		StoreDevtoolsModule.instrument(),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		})
	],
	providers: config.providers,
	bootstrap: [AppComponent]
})
export class AppModule { }
