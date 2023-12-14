import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DatabasePageComponent } from './pages/database-page/database-page.component';

const routes: Route[] = [
	{
		path: '',
		component: DatabasePageComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class DatabaseRoutingModule { }
