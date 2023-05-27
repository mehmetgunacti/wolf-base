import { Configuration } from 'lib';

export interface ConfState extends Configuration {

	initialized: boolean;

}

export const initialConfState: ConfState = {

	initialized: false,
	syncWorkerActive: false,
	sidebarVisible: true,
	theme: 'dark'

};