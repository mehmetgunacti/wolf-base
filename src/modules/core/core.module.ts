import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'modules/primeng.module';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CoreRoutingModule } from './core-routing.module';
import { CorePageComponent } from './pages/core-page/core-page.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';

@NgModule({
	declarations: [
		ThemeSwitcherComponent,
		LangSwitcherComponent,
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
		PrimeNgModule,
		NgProgressModule,
		NgProgressHttpModule
	],
	providers: [
		DialogService,
		ConfirmationService
	]
})
export class CoreModule { }
