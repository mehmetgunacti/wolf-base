import { NoteContentComponent } from './components/note-content/note-content.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteComponent } from './components/note/note.component';
import { NoteContainerComponent } from './containers/note-container/note-container.component';
import { NoteContentEditContainerComponent } from './containers/note-content-edit-container/note-content-edit-container.component';
import { NoteEditContainerComponent } from './containers/note-edit-container/note-edit-container.component';
import { NotesContainerComponent } from './containers/notes-container/notes-container.component';
import { NotesSearchAndTagCloudContainerComponent } from './containers/search-and-tag-cloud-container/notes-search-and-tag-cloud-container.component';
import { NoteContentFormPageComponent } from './pages/note-content-form-page/note-content-form-page.component';
import { NoteFormPageComponent } from './pages/note-form-page/note-form-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

export const components = [

	// components
	NoteComponent,
	NoteContentComponent,
	NoteFormComponent,

	// containers
	NoteContainerComponent,
	NoteEditContainerComponent,
	NoteContentEditContainerComponent,
	NotesContainerComponent,
	NotesSearchAndTagCloudContainerComponent,

	// pages
	NotePageComponent,
	NotesPageComponent,
	NoteFormPageComponent,
	NoteContentFormPageComponent

];
