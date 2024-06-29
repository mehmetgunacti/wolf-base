import { ActionReducerMap } from "@ngrx/store";
import { Quote_ModuleState } from "store/states/quote.state";
import { quote_EntitiesReducer } from "./quote-entities.reducer";

export const quoteReducer: ActionReducerMap<Quote_ModuleState> = {

	entities: quote_EntitiesReducer

}
