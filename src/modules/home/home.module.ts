import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import * as fromConfig from './home.config';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		HomeRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class HomeModule { }
