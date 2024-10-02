import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TestSuitesPageComponent } from './pages/test-suites-page/test-suites-page.component';
import { setSelectedIdGuard } from './learning.guard';

const routes: Route[] = [
	{
		path: '',
		component: TestSuitesPageComponent,
	},
	// {
	// 	path: 'new',
	// 	component: LearningNewFormPageComponent,
	// 	canActivate: [setSelectedIdGuard]
	// },
	// {
	// 	path: ':id',
	// 	component: LearningPageComponent,
	// 	canActivate: [setSelectedIdGuard]
	// },
	// {
	// 	path: ':id/new',
	// 	component: LearningNewFormPageComponent,
	// 	canActivate: [setSelectedIdGuard]
	// },
	// {
	// 	path: ':id/edit',
	// 	component: LearningEditFormPageComponent,
	// 	canActivate: [setSelectedIdGuard]
	// }

];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class LearningRoutingModule { }
