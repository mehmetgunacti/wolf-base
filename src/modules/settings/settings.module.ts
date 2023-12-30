import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import * as fromConfig from './settings.config';
import { SharedModule } from 'modules/shared/shared.module';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		SettingsRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class SettingsModule { }
