import { SYNC_STATES } from 'blueprints';
import { IBookmark } from './bookmark.model';
import { IModel } from './common.model';
import { INote } from './note.model';
import { ITaskList } from './task.model';
import { IWord } from './word.model';

export interface ISyncState {

	status?: SYNC_STATES;
	message?: string;

}

export interface ISyncData<T extends IModel> extends IModel {

	data: T;
	createTime: string;
	updateTime: string;
	updates: Partial<T>;

}

// export interface ISyncBookmark extends ISyncData<IBookmark> {

// 	clicks: number;

// }

// export interface ISyncNote extends ISyncData<INote> {}
// export interface ISyncTask extends ISyncData<ITaskList> {}
// export interface ISyncWord extends ISyncData<IWord> {}



