import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { CoreRoutingModule } from './core-routing.module';
import { CorePageComponent } from './pages/core-page/core-page.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { SharedModule } from 'modules/shared/shared.module';
import { ToastService } from '@lib';

@NgModule({
	declarations: [
		ThemeSwitcherComponent,
		CorePageComponent,
		UnauthorizedComponent
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [],
	providers: [
	]
})
export class CoreModule { }
