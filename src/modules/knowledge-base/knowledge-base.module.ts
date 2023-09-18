import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { KnowledgeBaseRoutingModule } from './knowledge-base-routing.module';
import * as fromConfig from './knowledge-base.config';

@NgModule({
	declarations: [...fromConfig.components],
	imports: [
		CommonModule,
		KnowledgeBaseRoutingModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class KnowledgeBaseModule { }
