import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CloudPageComponent } from './pages/cloud-page/cloud-page.component';

const routes: Route[] = [

	{
		path: '',
		component: CloudPageComponent
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CloudRoutingModule { }