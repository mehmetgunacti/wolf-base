import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { ModuleReportComponent } from './components/module-report/module-report.component';
import { DatabaseListContainerComponent } from './containers/database-list-container/database-list-container.component';
import { DatabaseRoutingModule } from './database-routing.module';
import { DatabasePageComponent } from './pages/database-page/database-page.component';

@NgModule({
	declarations: [
		DatabasePageComponent,
		DatabaseListContainerComponent
	],
	imports: [
		CommonModule,
		DatabaseRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		ModuleReportComponent
	],
	providers: []
})
export class DatabaseModule { }
