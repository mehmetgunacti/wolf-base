import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import * as fromConfig from './home.config';
import { OverlayContainerModule } from '@lib';
import { MarkOrHighlightModule } from 'lib/pipes/mark-or-highlight.pipe';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		HomeRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		OverlayContainerModule,
		MarkOrHighlightModule
	],
	providers: []
})
export class HomeModule { }
