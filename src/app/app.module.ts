import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as store from 'store';
import { AppComponent } from './app.component';
import * as config from './app.config';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(config.routes),
		StoreModule.forRoot(store.reducers, { metaReducers: store.metaReducers }),
		EffectsModule.forRoot(store.effects),
		StoreDevtoolsModule.instrument(),
	],
	providers: config.providers,
	bootstrap: [AppComponent]
})
export class AppModule { }
