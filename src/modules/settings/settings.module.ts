import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'lib/components/alert/alert.component';
import { MarkdownModule } from 'lib/components/markdown';
import { SwitchComponent } from 'lib/components/switch/switch.component';
import { SharedModule } from 'modules/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import * as fromConfig from './settings.config';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		SettingsRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		MarkdownModule,
		SwitchComponent,
		AlertComponent
	],
	providers: []
})
export class SettingsModule { }
