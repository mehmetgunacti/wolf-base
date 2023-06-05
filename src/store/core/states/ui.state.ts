export interface UIState {

	sidebarVisible: boolean,
	bigScreen: boolean,
	syncableItems: number

}

export const initialUIState: UIState = {

	sidebarVisible: true,
	bigScreen: true,
	syncableItems: 0

};
