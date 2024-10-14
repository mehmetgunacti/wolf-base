import { ActionReducerMap } from '@ngrx/store';
import { Note_ModuleState } from 'store/states/note.state';
import { note_UIReducer } from './note-ui.reducer';

export const noteReducer: ActionReducerMap<Note_ModuleState> = {

	ui: note_UIReducer

}
