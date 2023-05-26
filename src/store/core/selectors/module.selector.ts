import { createFeatureSelector } from "@ngrx/store";
import { CoreModuleState } from "../states";

export const coreModuleState = createFeatureSelector<CoreModuleState>('core');