import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgModule } from 'modules/primeng.module';
import { PortalComponent, TagCloudComponent } from './components';

@NgModule({
	declarations: [
		PortalComponent,
		TagCloudComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		PrimeNgModule,
		ReactiveFormsModule
	],
	exports: [
		PrimeNgModule,
		PortalComponent,
		TagCloudComponent,
		TranslateModule,
		ReactiveFormsModule
	],
	providers: []
})
export class SharedModule { }
