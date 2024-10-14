import { createFeatureSelector } from '@ngrx/store';
import { Entity_ModuleState } from '@states';

export const selEntity_ModuleState = createFeatureSelector<Entity_ModuleState>('entities');
