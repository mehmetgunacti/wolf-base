import { Bookmark } from 'lib/models';

export enum SYNC_STATES {

	ERROR = 1,
	DONE = 2,
	READY = 3,
	PROCESSING_DELETED = 4,
	DOWNLOADING = 5,
	PROCESSING_NEW = 6,
	PROCESSING_UPDATES = 7,
	SAVING = 8

}

export type WolfBaseEntity = Bookmark; // | INote | ITaskList | IWord | IFast | IWeight | IWorkout;
