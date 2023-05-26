import { EntitiesState, entitiesInitialState } from './entities.state';
import { TagsState, tagsInitialState } from './tags.state';
import { UIState, uiInitialState } from './ui.state';

export interface BookmarkModuleState {

    entities: EntitiesState;
    ui: UIState;
    tags: TagsState;

}

export const initialBookmarkState: BookmarkModuleState = {

	entities: entitiesInitialState,
    ui: uiInitialState,
    tags: tagsInitialState

};