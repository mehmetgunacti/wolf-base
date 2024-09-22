import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import * as fromConfig from './settings.config';
import { MarkdownEditorComponent, MarkdownModule } from 'lib/components/markdown';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		SettingsRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		MarkdownModule
	],
	providers: []
})
export class SettingsModule { }
