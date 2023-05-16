import { Configuration, THEME } from 'lib';

export interface ConfState extends Configuration { }

export const initialConfState: ConfState = {

	syncWorkerActive: false,
	sidebarVisible: true,
	theme: 'dark'

};
