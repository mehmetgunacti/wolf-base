import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ComponentsPageComponent } from './pages/components-page/components-page.component';

const routes: Route[] = [

	{
		path: '',
		component: SettingsPageComponent
	},
	{
		path: 'components',
		component: ComponentsPageComponent
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SettingsRoutingModule { }
