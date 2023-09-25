import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KBEntry, KBEntryNode, UUID } from 'lib';
import { TreeNode } from 'primeng/api';
import { EditFormImpl, KBEntryForm, KB_ENTRY_FORM } from './kb-entry-form';

const confirmMessage = (name: string) => `
${name}

will be deleted. Continue?`;

function toTreeNode(nodes: KBEntryNode[]): TreeNode<void>[] {

	const a = nodes.map(node => (
		{
			key: node.id,
			label: node.name,
			children: toTreeNode(node.children)
		} as TreeNode<void>
	));
	console.log(a);
	return a;
	

}

@Component({
	selector: 'app-kb-entry-form',
	templateUrl: './kb-entry-form.component.html',
	providers: [{ provide: KB_ENTRY_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KBEntryFormComponent {

	@Input() set entry(value: KBEntry | null) {

		if (value) {

			this.kbEntry = value;
			this.form.patchValue(value);

		}

	};
	@Input({ transform: toTreeNode }) parents: TreeNode<void>[] = [];

	@Output() create: EventEmitter<Partial<KBEntry>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, kbEntry: Partial<KBEntry> }> = new EventEmitter();
	@Output() delete: EventEmitter<UUID> = new EventEmitter();

	kbEntry: KBEntry | null = null;
	form: KBEntryForm = inject(KB_ENTRY_FORM);
	fcParentNodes = new FormControl();
	isPopular: boolean = false;

	onSave(): void {

		if (this.form.isInvalid())
			return;

		const kbEntry: KBEntry = this.form.value;
		if (kbEntry.id)
			this.update.emit({ id: kbEntry.id, kbEntry });
		else
			this.create.emit(kbEntry);

	}

	onDelete(): void {

		if (!this.kbEntry)
			return;

		if (confirm(confirmMessage(this.kbEntry.name)))
			this.delete.emit(this.kbEntry.id);

	}

	onTogglePopular(): void {

		this.form.togglePopular();

	}

	addURL(): void {

		this.form.addURL();

	}

	removeURL(idx: number): void {

		this.form.removeURL(idx);

	}

	prefixUrl(event: Event): void {

		const inputElement = event.target as HTMLInputElement;
		const value = inputElement.value;

		if (value === "h" || value === "H")
			inputElement.value = "https://www.";

	}

	nodeSelect(a: any): void {
		console.log(a);
		
	}

}
