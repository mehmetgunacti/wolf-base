import { SYNC_STATES } from 'lib';
import { Bookmark } from './bookmark.model';
import { Model } from './common.model';

export interface ISyncState {

	status?: SYNC_STATES;
	message?: string;

}

export interface ISyncData<T extends Model> extends Model {

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



