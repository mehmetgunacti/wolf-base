import { DEFAULT_CONF_VALUES } from '@constants/database.constant';
import { SidebarState } from '@constants/sidebar.constant';
import { Theme } from '@constants/theme.constant';
import { FirestoreConfig } from '@models/configuration.model';

export interface Core_ModuleState {

	conf: CoreConfigurationState;
	ui: CoreUIState;

}

export interface CoreUIState {

	sidebarState: SidebarState,
	bigScreen: boolean,
	syncableItems: number,
	theme: Theme,
	now: number;
	progressCounter: number;

}

export interface CoreConfigurationState {

	initialized: boolean;
	titleLookupUrl: string | null;
	firestoreConfig: FirestoreConfig | null;
	popularBookmarks: string[],
	pinnedNotes: string[];

}

// INITIALIZATION

export const initialCoreConfigurationState: CoreConfigurationState = {

	initialized: false,
	firestoreConfig: null,
	titleLookupUrl: null,
	popularBookmarks: [],
	pinnedNotes: []

};

export const core_initialUIState: CoreUIState = {

	sidebarState: SidebarState.FULL,
	bigScreen: false,
	syncableItems: 0,
	theme: DEFAULT_CONF_VALUES.theme,
	now: Date.now(),
	progressCounter: 0

};

export const core_initialState: Core_ModuleState = {

	conf: initialCoreConfigurationState,
	ui: core_initialUIState

};
