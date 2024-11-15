import { UUID } from '@constants/common.constant';
import { LogCategory } from '@constants/log.constant';
import { LogMessage } from '@models/log.model';

export interface LogsLocalRepository {

	add(message: LogMessage): Promise<void>;
	list(params: { categories?: LogCategory[]; entityId?: UUID | null, limit: number; }): Promise<LogMessage[]>;
	clear(): Promise<void>;

}
