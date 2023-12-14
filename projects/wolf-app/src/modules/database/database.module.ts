import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { DatabaseRoutingModule } from './database-routing.module';
import { DatabasePageComponent } from './pages/database-page/database-page.component';

@NgModule({
	declarations: [ DatabasePageComponent ],
	imports: [
		CommonModule,
		DatabaseRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class DatabaseModule { }
