import { ProjectFilterComponent } from './components/project-filter/project-filter.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectContainerComponent } from './containers/project-container/project-container.component';
import { ProjectEditFormContainerComponent } from './containers/project-edit-form-container/project-edit-form-container.component';
import { ProjectFilterContainerComponent } from './containers/project-filter-container/project-filter-container.component';
import { ProjectNewFormContainerComponent } from './containers/project-new-form-container/project-new-form-container.component';
import { ProjectsContainerComponent } from './containers/projects-container/projects-container.component';
import { ProjectEditFormPageComponent } from './pages/project-edit-form-page/project-form-edit-page.component';
import { ProjectNewFormPageComponent } from './pages/project-new-form-page/project-new-form-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';

export const components = [

	// components
	ProjectComponent,
	ProjectFormComponent,
	ProjectFilterComponent,
	ProjectFilterContainerComponent,

	// containers
	ProjectContainerComponent,
	ProjectNewFormContainerComponent,
	ProjectEditFormContainerComponent,
	ProjectsContainerComponent,

	// pages
	ProjectPageComponent,
	ProjectsPageComponent,
	ProjectEditFormPageComponent,
	ProjectNewFormPageComponent,

];
