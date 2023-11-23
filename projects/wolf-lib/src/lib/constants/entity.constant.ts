export class EntityName {

	constructor(
		public name: string,
		public plural: string
	) { }

	toString(): string {

		return this.plural;

	}

}

export class WolfEntity {

	static bookmark = new EntityName('bookmark', 'bookmarks');
	static kb_entry = new EntityName('kb_entry', 'kb_entries');
	static kb_content = new EntityName('kb_content', 'kb_contents');

}
