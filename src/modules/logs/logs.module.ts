import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { LogsRoutingModule } from './logs-routing.module';
import * as fromConfig from './logs.config';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		LogsRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class LogsModule { }
