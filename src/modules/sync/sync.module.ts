import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { SyncRoutingModule } from './sync-routing.module';
import * as fromConfig from './sync.config';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		SyncRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class SyncModule { }
