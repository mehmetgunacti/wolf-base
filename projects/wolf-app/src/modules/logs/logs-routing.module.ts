import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LogsPageComponent } from './pages/logs-page/logs-page.component';

const routes: Route[] = [

	{
		path: '',
		component: LogsPageComponent
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LogsRoutingModule { }