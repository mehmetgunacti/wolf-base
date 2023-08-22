import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { StatsRoutingModule } from './stats-routing.module';
import * as fromConfig from './stats.config';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		StatsRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class StatsModule { }
