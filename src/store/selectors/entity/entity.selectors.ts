import { createFeatureSelector } from '@ngrx/store';
import { Entity_ModuleState } from 'store/states/entity.state';

export const selEntity_ModuleState = createFeatureSelector<Entity_ModuleState>('entities');
