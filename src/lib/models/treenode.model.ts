import { HasParentId } from './entity.model';

export interface TreeNode {

	name: string;
	value: HasParentId;
	children: TreeNode[];
	level: number;
	expandable: boolean;
	isExpanded: boolean;

}
