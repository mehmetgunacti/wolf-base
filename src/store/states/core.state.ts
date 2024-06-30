import { DEFAULT_CONF_VALUES, FirestoreConfig, SidebarState, Theme } from "@lib";

export interface CoreModuleState {

	conf: CoreConfigurationState;
	ui: CoreUIState;

}

export interface CoreUIState {

	sidebarState: SidebarState,
	bigScreen: boolean,
	syncableItems: number,
	theme: Theme,
	quotesRunning: boolean

}

export interface CoreConfigurationState {

	initialized: boolean;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;
	popularBookmarks: string[],
	pinnedNotes: string[]

}

// INITIALIZATION

export const initialCoreConfigurationState: CoreConfigurationState = {

	initialized: false,
	firestoreConfig: null,
	titleLookupUrl: null,
	popularBookmarks: [],
	pinnedNotes: []

};

export const initialCoreUIState: CoreUIState = {

	sidebarState: DEFAULT_CONF_VALUES.sidebarState,
	bigScreen: true,
	syncableItems: 0,
	theme: DEFAULT_CONF_VALUES.theme,
	quotesRunning: true

};

export const initialCoreState: CoreModuleState = {

	conf: initialCoreConfigurationState,
	ui: initialCoreUIState

}
