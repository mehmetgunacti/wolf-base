import { ActionReducerMap } from "@ngrx/store";
import { NoteContent_ModuleState } from 'store/states/note-content.state';
import { noteContent_UIReducer } from './note-content-ui.reducer';

export const noteContentReducer: ActionReducerMap<NoteContent_ModuleState> = {

	ui: noteContent_UIReducer

}
