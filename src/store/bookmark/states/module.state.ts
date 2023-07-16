import { EntitiesState, entitiesInitialState } from './entities.state';
import { SyncState, syncInitialState } from './sync.state';
import { TagsState, tagsInitialState } from './tags.state';
import { UIState, uiInitialState } from './ui.state';

export interface BookmarkModuleState {

    entities: EntitiesState;
    ui: UIState;
    tags: TagsState;
    sync: SyncState;

}

export const initialBookmarkState: BookmarkModuleState = {

	entities: entitiesInitialState,
    ui: uiInitialState,
    tags: tagsInitialState,
    sync: syncInitialState

};