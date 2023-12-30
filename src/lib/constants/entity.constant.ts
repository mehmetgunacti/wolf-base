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
	static note = new EntityName('note', 'notes');
	static note_content = new EntityName('note_content', 'note_content');

}
