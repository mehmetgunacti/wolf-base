import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SyncPageComponent } from './pages/sync-page/sync-page.component';

const routes: Route[] = [
	{
		path: '',
		component: SyncPageComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class SyncRoutingModule { }
