import { ActionReducerMap } from "@ngrx/store";
import { Word_ModuleState } from "store/states/word.state";
import { word_UIReducer } from "./word-ui.reducer";

export const wordReducer: ActionReducerMap<Word_ModuleState> = {

	ui: word_UIReducer

}
