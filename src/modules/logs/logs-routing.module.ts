import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LogsPageComponent } from './pages/logs-page/logs-page.component';
import { setSelectedIdGuard } from './logs.guard';

const routes: Route[] = [

	{
		path: '',
		component: LogsPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{

		path: ':id',
		component: LogsPageComponent,
		canActivate: [setSelectedIdGuard]

	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LogsRoutingModule { }
