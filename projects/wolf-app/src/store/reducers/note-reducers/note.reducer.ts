import { ActionReducerMap } from "@ngrx/store";
import { NoteModuleState } from "store/states/note.state";
import { noteEntitiesReducer } from "./note-entities.reducer";
import { noteTagsReducer } from "./note-tags.reducer";
import { noteUIReducer } from "./note-ui.reducer";

export const noteReducer: ActionReducerMap<NoteModuleState> = {

	entities: noteEntitiesReducer,
	ui: noteUIReducer,
	tags: noteTagsReducer

}
