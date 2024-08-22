import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Entity_ModuleState } from 'store/states/entity.state';

export const selEntity_ModuleState = createFeatureSelector<Entity_ModuleState>('entities');

// export const selEntity_EntitiesState = createSelector(

// 	selEntity_ModuleState,
// 	state => state.entities

// );
