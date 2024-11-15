import { UUID } from '@constants/common.constant';
import { LogCategory } from '@constants/log.constant';
import { ISODateString } from './id-base.model';

export interface LogMessage {

	id?: number;
	date: ISODateString;
	category: LogCategory;
	message: string;
	entityId?: UUID;
	entityName?: string;

}
