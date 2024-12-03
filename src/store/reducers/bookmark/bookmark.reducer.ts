import { ActionReducerMap } from '@ngrx/store';
import { Bookmark_ModuleState } from 'store/states/bookmark.state';
import { bookmarkClicksReducer } from './bookmark-clicks.reducer';
import { bookmarkUIReducer } from './bookmark-ui.reducer';

export const bookmarkReducer: ActionReducerMap<Bookmark_ModuleState> = {

	clicks: bookmarkClicksReducer,
	ui: bookmarkUIReducer

}
