import { IAction, CONF_KEYS } from 'blueprints';

export class CheckActiveAction implements IAction<void, Promise<boolean>> {

	constructor(
		// private db: KnobaDB
	) { }

	async execute(): Promise<boolean> {

		return false; // this.db.configuration.get(CONF_KEYS.syncWorkerActive) ? true : false;

	}

}
