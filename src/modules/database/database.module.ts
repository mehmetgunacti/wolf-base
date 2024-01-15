import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'modules/shared/shared.module';
import { DatabaseRoutingModule } from './database-routing.module';
import { DatabasePageComponent } from './pages/database-page/database-page.component';
import { DatabaseFilterComponent } from './components/database-filter/database-filter.component';
import { DatabaseFilterContainerComponent } from './containers/database-filter-container/database-filter-container.component';
import { DatabaseListContainerComponent } from './containers/database-list-container/database-list-container.component';

@NgModule({
	declarations: [
		DatabasePageComponent,
		DatabaseFilterComponent,
		DatabaseFilterContainerComponent,
		DatabaseListContainerComponent
	],
	imports: [
		CommonModule,
		DatabaseRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: []
})
export class DatabaseModule { }
