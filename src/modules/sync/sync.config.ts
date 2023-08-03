import { SyncConflictComponent } from "./components/sync-conflict/sync-conflict.component";
import { SyncSynchronizeComponent } from "./components/sync-synchronize/sync-synchronize.component";
import { SyncConflictContainerComponent } from "./containers/sync-conflict-container/sync-conflict-container.component";
import { SyncSummaryContainerComponent } from "./containers/sync-summary-container/sync-summary-container.component";
import { SyncSynchronizeContainerComponent } from "./containers/sync-synchronize-container/sync-synchronize-container.component";
import { SyncPageComponent } from "./pages/sync-page/sync-page.component";

export const components = [

	SyncPageComponent,
	SyncSummaryContainerComponent,
	SyncConflictContainerComponent,
	SyncConflictComponent,
	SyncSynchronizeContainerComponent,
	SyncSynchronizeComponent

];
