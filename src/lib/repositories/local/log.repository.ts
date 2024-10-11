import { LogCategory, UUID } from 'lib/constants';
import { LogMessage } from 'lib/models';

export interface LogsLocalRepository {

	add(message: LogMessage): Promise<void>;
	list(params: { categories?: LogCategory[]; entityId?: UUID | null, limit: number }): Promise<LogMessage[]>;
	clear(): Promise<void>;

}
