export interface DatabaseModuleState {

	selectedValues: string[];
	searchValue: string | null;

}

export const initialDatabaseState: DatabaseModuleState = {

	selectedValues: [],
	searchValue: null

};