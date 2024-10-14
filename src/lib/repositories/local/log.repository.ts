import { LogCategory, UUID } from '@constants';
import { LogMessage } from '@models';

export interface LogsLocalRepository {

	add(message: LogMessage): Promise<void>;
	list(params: { categories?: LogCategory[]; entityId?: UUID | null, limit: number }): Promise<LogMessage[]>;
	clear(): Promise<void>;

}
