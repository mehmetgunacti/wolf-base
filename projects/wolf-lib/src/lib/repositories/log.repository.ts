import { LogCategory } from 'lib/constants';
import { LogMessage } from 'lib/models';

export interface LogsRepository {

	add(message: LogMessage): Promise<void>;
	list(params?: { category: LogCategory | null; }): Promise<LogMessage[]>;
	clear(): Promise<void>;

}
