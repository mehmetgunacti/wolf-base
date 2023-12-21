import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteComponent } from './components/note/note.component';
import { NoteContainerComponent } from './containers/note-container/note-container.component';
import { NoteEditContainerComponent } from './containers/note-edit-container/note-edit-container.component';
import { NotesContainerComponent } from './containers/notes-container/notes-container.component';
import { NotesSearchAndTagCloudContainerComponent } from './containers/search-and-tag-cloud-container/notes-search-and-tag-cloud-container.component';
import { NoteFormPageComponent } from './pages/note-form-page/note-form-page.component';
import { NotePageComponent } from './pages/note-page/note-page.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';

export const components = [

	// components
	NoteComponent,
	NoteFormComponent,

	// containers
	NoteContainerComponent,
	NoteEditContainerComponent,
	NotesContainerComponent,
	NotesSearchAndTagCloudContainerComponent,

	// pages
	NotePageComponent,
	NotesPageComponent,
	NoteFormPageComponent

];
