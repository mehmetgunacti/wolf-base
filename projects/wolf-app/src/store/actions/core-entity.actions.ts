import { Entity, UUID, WolfEntity } from '@lib';
import { createAction, props } from '@ngrx/store';

export const createEntity = createAction('[CORE] Create Entity', props<{ entity: WolfEntity, data: Partial<Entity> }>());
export const createEntitySuccess = createAction('[CORE] Create Entity Success', props<{ entity: WolfEntity, data: Entity }>());

export const updateEntity = createAction('[CORE] Update Entity', props<{ id: UUID, entity: WolfEntity, data: Partial<Entity> }>());
export const updateEntitySuccess = createAction('[CORE] Update Entity Success', props<{ entity: WolfEntity }>());

export const deleteEntity = createAction('[CORE] Delete Entity', props<{ entity: WolfEntity, id: UUID }>());
export const deleteEntitySuccess = createAction('[CORE] Delete Entity Success', props<{ entity: WolfEntity }>());
