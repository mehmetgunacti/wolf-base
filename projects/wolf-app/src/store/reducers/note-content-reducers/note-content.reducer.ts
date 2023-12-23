import { ActionReducerMap } from "@ngrx/store";
import { NoteContent_ModuleState } from 'store/states/note-content.state';
import { noteContent_EntitiesReducer } from './note-content-entities.reducer';

export const noteContentReducer: ActionReducerMap<NoteContent_ModuleState> = {

	entities: noteContent_EntitiesReducer

}
