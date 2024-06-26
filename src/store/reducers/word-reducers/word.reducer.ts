import { ActionReducerMap } from "@ngrx/store";
import { Word_ModuleState } from "store/states/word.state";
import { word_EntitiesReducer } from "./word-entities.reducer";
import { word_UIReducer } from "./word-ui.reducer";

export const wordReducer: ActionReducerMap<Word_ModuleState> = {

	entities: word_EntitiesReducer,
	ui: word_UIReducer

}
