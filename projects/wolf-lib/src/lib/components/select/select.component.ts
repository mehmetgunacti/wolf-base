import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UUID } from 'lib/constants';
import { HasParentId, TreeNode } from 'lib/models';

@Component({
	selector: 'w-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

	treeNodes: TreeNode[] = [];

	@Input() name: string = '';
	@Input() control!: FormControl<UUID | null>;
	@Input() set nodes(arr: HasParentId[]) {

		this.treeNodes = this.prepareNodes(arr);

	};

	private prepareNodes(nodes: HasParentId[]): TreeNode[] {

		const NULL = 'null';

		// sort by name
		nodes.sort((a, b) => a.name.localeCompare(b.name));

		const map: Map<UUID, HasParentId[]> = new Map();
		map.set(NULL, []);
		nodes.forEach(n => {

			const key = n.parentId ?? NULL;
			if (!map.has(key))
				map.set(key, []);
			map.get(key)?.push(n);

		});
		return this.concatArray(NULL, 0, map);

	}

	private concatArray(key: string, level: number, map: Map<UUID, HasParentId[]>): TreeNode[] {

		const retValue: TreeNode[] = [];
		map.get(key)?.forEach(node => {

			retValue.push({ value: node, level });
			retValue.push(...this.concatArray(node.id, level + 1, map))

		});
		return retValue;

	}

}
