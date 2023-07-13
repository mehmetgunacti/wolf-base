import { NgModule, inject } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SyncPageComponent } from './pages/sync-page/sync-page.component';
import { apiKeyEntered } from './sync.guard';
import { SyncCredentialsPageComponent } from './pages/sync-credentials-page/sync-credentials-page.component';

const routes: Route[] = [

	{
		path: '',
		component: SyncPageComponent,
		canActivate: [apiKeyEntered]
	},
	{
		path: 'edit',
		component: SyncCredentialsPageComponent
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SyncRoutingModule { }