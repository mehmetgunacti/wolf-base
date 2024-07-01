import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, withViewTransitions } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MenuComponent } from 'lib/components/menu/menu.component';
import * as store from 'store/store.config';
import { AppComponent } from './app.component';
import * as config from './app.config';
import { HeaderComponent } from './components/header/header.component';
import { NavOverlayComponent } from './components/nav-overlay/nav-overlay.component';
import { NavComponent } from './components/nav/nav.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        NavOverlayComponent,
        MenuComponent,
        SplashScreenComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(config.routes, { enableViewTransitions: true }),
        StoreModule.forRoot(store.reducers, { metaReducers: store.metaReducers }),
        EffectsModule.forRoot(store.effects),
        StoreDevtoolsModule.instrument(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(), // environment.production
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000' // 'registerImmediately'
        }),
        ScrollingModule,
        NgProgressModule.withConfig({ thick: false, color: 'red', spinner: false }),
        NgProgressHttpModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
