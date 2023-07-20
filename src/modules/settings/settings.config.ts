import { FirestoreConfigFormComponent } from "./components/firestore-config-form/firestore-config-form.component";
import { TitleLookupConfigFormComponent } from "./components/title-lookup-config-form/title-lookup-config-form.component";
import { FirestoreConfigContainerComponent } from "./containers/firestore-config-container/firestore-config-container.component";
import { TitleLookupConfigContainerComponent } from "./containers/title-lookup-config-container/title-lookup-config-container.component";
// import { SettingsSummaryContainerComponent } from "./containers/settings-summary-container/settings-summary-container.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";

export const components = [

	SettingsPageComponent,
	FirestoreConfigContainerComponent,
	FirestoreConfigFormComponent,
	TitleLookupConfigContainerComponent,
	TitleLookupConfigFormComponent

];
