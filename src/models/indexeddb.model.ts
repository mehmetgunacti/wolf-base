
// IndexedDb
export interface Command {
	execute(vce: IDBVersionChangeEvent): void;
}

type Version = number;
type UpgradeConfig = Record<Version, Command[]>;

export interface IndexedDbConfiguration {

	dbName: string;
	upgrades: UpgradeConfig;

}
