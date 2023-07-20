import { Configuration } from "lib";

export interface CoreModuleState {

	conf: CoreConfigurationState;
	ui: CoreUIState;

}

export interface CoreUIState {

	sidebarVisible: boolean,
	bigScreen: boolean,
	syncableItems: number

}

export interface CoreConfigurationState extends Configuration {

	initialized: boolean;

}

// INITIALIZATION

export const initialCoreConfigurationState: CoreConfigurationState = {

	initialized: false,
	syncWorkerActive: false,
	sidebarVisible: true,
	darkTheme: true,
	apiKey: null,
	baseURL: null,
	projectId: null,
	titleLookupUrl: null

};

export const initialCoreUIState: CoreUIState = {

	sidebarVisible: true,
	bigScreen: true,
	syncableItems: 0

};

export const initialCoreState: CoreModuleState = {

	conf: initialCoreConfigurationState,
	ui: initialCoreUIState

}