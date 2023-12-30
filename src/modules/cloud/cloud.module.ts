import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { CloudRoutingModule } from './cloud-routing.module';
import * as fromConfig from './cloud.config';

@NgModule({
	declarations: fromConfig.components,
	imports: [
		CommonModule,
		CloudRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class CloudModule { }
