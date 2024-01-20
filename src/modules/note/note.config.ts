import { NoteContentComponent } from './components/note-content/note-content.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteComponent } from './components/note/note.component';
import { NoteContainerComponent } from './containers/note-container/note-container.component';
import { NoteContentEditContainerComponent } from './containers/note-content-edit-container/note-content-edit-container.component';
import { NoteEditFormContainerComponent } from './containers/note-edit-form-container/note-edit-form-container.component';
import { NoteNewFormContainerComponent } from './containers/note-new-form-container/note-new-form-container.component';
import { NotesContainerComponent } from './containers/notes-container/notes-container.component';
import { NotesSearchAndTagCloudContainerComponent } from './containers/search-and-tag-cloud-container/notes-search-and-tag-cloud-container.component';
import { NoteContentFormPageComponent } from './pages/note-content-form-page/note-content-form-page.component';
import { NoteEditFormPageComponent } from './pages/note-edit-form-page/note-form-edit-page.component';
import { NoteNewFormPageComponent } from './pages/note-new-form-page/note-new-form-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

export const components = [

	// components
	NoteComponent,
	NoteContentComponent,
	NoteFormComponent,

	// containers
	NoteContainerComponent,
	NoteNewFormContainerComponent,
	NoteEditFormContainerComponent,
	NoteContentEditContainerComponent,
	NotesContainerComponent,
	NotesSearchAndTagCloudContainerComponent,

	// pages
	NotePageComponent,
	NotesPageComponent,
	NoteEditFormPageComponent,
	NoteNewFormPageComponent,
	NoteContentFormPageComponent

];
