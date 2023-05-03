import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'modules/primeng.module';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CoreRoutingModule } from './core-routing.module';
import { CorePageComponent } from './pages/core-page/core-page.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

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
		ReactiveFormsModule,
		PrimeNgModule,

	],
	exports: [
		PrimeNgModule
	],
	providers: [
		DialogService,
		ConfirmationService
	]
})
export class CoreModule { }
