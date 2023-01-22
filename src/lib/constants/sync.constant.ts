import { Bookmark } from 'lib/models';

export enum SYNC_STATES {

	ERROR = 1,
	DONE = 2,
	READY = 3,
	PROCESSING_DELETED = 4,
	DOWNLOADING = 5,
	PROCESSING_NEW = 6,
	PROCESSING_UPDATES = 7,
	PROCESSING_CLICKS = 8,
	SAVING = 9

}

export type IKnobaEntity = Bookmark; // | INote | ITaskList | IWord | IFast | IWeight | IWorkout;
