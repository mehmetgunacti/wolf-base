import { createFeatureSelector } from '@ngrx/store';
import { Core_ModuleState } from 'store/states/core.state';

export const coreModuleState = createFeatureSelector<Core_ModuleState>('core');
