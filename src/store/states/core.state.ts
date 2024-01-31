import { DEFAULT_CONF_VALUES, FirestoreConfig, SidebarState, Theme } from "@lib";

export interface CoreModuleState {

	conf: CoreConfigurationState;
	ui: CoreUIState;

}

export interface CoreUIState {

	sidebarState: SidebarState,
	bigScreen: boolean,
	syncableItems: number,
	theme: Theme

}

export interface CoreConfigurationState {

	initialized: boolean;
	syncWorkerActive: boolean | null;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;

}

// INITIALIZATION

export const initialCoreConfigurationState: CoreConfigurationState = {

	initialized: false,
	syncWorkerActive: false,
	firestoreConfig: null,
	titleLookupUrl: null

};

export const initialCoreUIState: CoreUIState = {

	sidebarState: DEFAULT_CONF_VALUES.sidebarState,
	bigScreen: true,
	syncableItems: 0,
	theme: DEFAULT_CONF_VALUES.theme,

};

export const initialCoreState: CoreModuleState = {

	conf: initialCoreConfigurationState,
	ui: initialCoreUIState

}
