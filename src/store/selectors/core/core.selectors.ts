import { createFeatureSelector } from '@ngrx/store';
import { CoreModuleState } from 'store/states/core.state';

export const coreModuleState = createFeatureSelector<CoreModuleState>('core');
