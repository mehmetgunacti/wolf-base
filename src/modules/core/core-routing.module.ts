import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorePageComponent } from './pages/core-page/core-page.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
	{
		path: '',
		component: CorePageComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('modules/home/home.module').then(m => m.HomeModule)
			},
   			{
				path: 'bookmarks',
				loadChildren: () => import('modules/bookmark/bookmark.module').then(m => m.BookmarkModule)
			},
			{
				path: 'database',
				loadChildren: () => import('modules/database/database.module').then(m => m.DatabaseModule)
			},
			{
				path: 'logs',
				loadChildren: () => import('modules/logs/logs.module').then(m => m.LogsModule)
			},
			{
				path: 'stats',
				loadChildren: () => import('modules/stats/stats.module').then(m => m.StatsModule)
			},
			{
				path: 'settings',
				loadChildren: () => import('modules/settings/settings.module').then(m => m.SettingsModule)
			},
			{
				path: '403',
				component: UnauthorizedComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule],
	providers: []
})
export class CoreRoutingModule { }
