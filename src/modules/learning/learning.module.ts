import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CroppieModule, OverlayContainerModule } from '@lib';
import { SharedModule } from 'modules/shared/shared.module';
import { LearningRoutingModule } from './learning-routing.module';
import * as fromConfig from './learning.config';
import { MarkdownModule } from 'lib/components/markdown';
import { HideEnumModule } from 'lib/pipes/hide-enum.pipe';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		LearningRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		CroppieModule,
		MarkdownModule,
		HideEnumModule,
		OverlayContainerModule
	]
})
export class LearningModule { }
