import { Routes } from '@angular/router';
import { setSelectedIdGuard } from './guards/test-suites.guard';

export const FEATURE_ROUTES: Routes = [

	{

		path: 'new',
		loadComponent: () => import('pages/test-suite-new-form.page').then(c => c.TestSuiteNewFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id',
		loadComponent: () => import('pages/test-suite.page').then(c => c.TestSuitePage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/edit',
		loadComponent: () => import('pages/test-suite-edit-form.page').then(c => c.TestSuiteEditFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: '',
		loadComponent: () => import('pages/test-suites.page').then(c => c.TestSuitesPage)

	},
	{

		path: ':id/exams/:examId/edit',
		loadComponent: () => import('pages/exam-edit.page').then(c => c.ExamEditPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/exams/new',
		loadComponent: () => import('pages/exam-edit.page').then(c => c.ExamEditPage),
		canActivate: [ setSelectedIdGuard ]

	}

];
