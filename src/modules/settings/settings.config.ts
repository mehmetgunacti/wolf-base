import { FirestoreConfigFormComponent } from "./components/firestore-config-form/firestore-config-form.component";
import { PinnedNotesFormComponent } from './components/pinned-notes-form/pinned-notes-form.component';
import { PopularBookmarksFormComponent } from './components/popular-bookmarks-form/popular-bookmarks-form.component';
import { TitleLookupConfigFormComponent } from "./components/title-lookup-config-form/title-lookup-config-form.component";
import { FirestoreConfigContainerComponent } from "./containers/firestore-config-container/firestore-config-container.component";
import { PinnedNotesFormContainerComponent } from './containers/pinned-notes-container/pinned-notes-form-container.component';
import { PopularBookmarksFormContainerComponent } from './containers/popular-bookmarks-container/popular-bookmarks-form-container.component';
import { TitleLookupConfigContainerComponent } from "./containers/title-lookup-config-container/title-lookup-config-container.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";

export const components = [

	SettingsPageComponent,

	FirestoreConfigContainerComponent,
	FirestoreConfigFormComponent,

	TitleLookupConfigContainerComponent,
	TitleLookupConfigFormComponent,

	PinnedNotesFormContainerComponent,
	PinnedNotesFormComponent,

	PopularBookmarksFormContainerComponent,
	PopularBookmarksFormComponent

];
