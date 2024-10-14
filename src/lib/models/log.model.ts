import { LogCategory, UUID } from '@constants';
import { ISODateString } from './id-base.model';

export interface LogMessage {

	id?: number;
	date: ISODateString;
	category: LogCategory;
	message: string;
	entityId?: UUID;
	entityName?: string;

}
