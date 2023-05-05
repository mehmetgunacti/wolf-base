import { THEME } from 'lib';

export interface ConfState {

	syncWorkerActive: boolean,
	sidebarVisible: boolean,
	theme: THEME

}

export const initialConfState: ConfState = {

	syncWorkerActive: false,
	sidebarVisible: true,
	theme: 'dark'

};
