import { ActionReducerMap } from "@ngrx/store";
import { Note_ModuleState } from "store/states/note.state";
import { note_EntitiesReducer } from "./note-entities.reducer";
import { note_UIReducer } from "./note-ui.reducer";

export const noteReducer: ActionReducerMap<Note_ModuleState> = {

	entities: note_EntitiesReducer,
	ui: note_UIReducer

}
