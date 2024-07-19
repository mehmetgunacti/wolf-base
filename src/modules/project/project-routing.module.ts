import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProjectEditFormPageComponent } from './pages/project-edit-form-page/project-form-edit-page.component';
import { ProjectNewFormPageComponent } from './pages/project-new-form-page/project-new-form-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { setSelectedIdGuard } from './project.guard';

const routes: Route[] = [
	{
		path: '',
		component: ProjectsPageComponent,
	},
	{
		path: 'new',
		component: ProjectNewFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id',
		component: ProjectPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/new',
		component: ProjectNewFormPageComponent,
		canActivate: [setSelectedIdGuard]
	},
	{
		path: ':id/edit',
		component: ProjectEditFormPageComponent,
		canActivate: [setSelectedIdGuard]
	}

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
