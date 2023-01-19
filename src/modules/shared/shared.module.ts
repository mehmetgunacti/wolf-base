import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgModule } from 'modules/primeng.module';
import { PortalComponent } from './components';

@NgModule({
	declarations: [
		PortalComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		PrimeNgModule
	],
	exports: [
		PrimeNgModule,
		PortalComponent,
		TranslateModule
	],
	providers: []
})
export class SharedModule { }
