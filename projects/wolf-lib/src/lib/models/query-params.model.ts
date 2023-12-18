import { UUID } from 'lib/constants';

export interface QueryParams {

	search: string | null,
	tags: string[],
	id: UUID | null

}
