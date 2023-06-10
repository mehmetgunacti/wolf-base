import { Entity } from "./entity.model";
import { IDBase } from "./id-base.model";

export interface ConflictData<T extends Entity> extends IDBase {

	local: T;
	remote: T;

}
