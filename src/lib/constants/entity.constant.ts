export enum EntityType {

	bookmark	= 'bookmark',
	note		= 'note',
	noteContent	= 'noteContent',
	project		= 'project',
	quizEntry	= 'quizEntry',
	quote		= 'quote',
	task		= 'task',
	word		= 'word'

}

export class EntityName {

	constructor(
		public name: string,
		public plural: string, // value of 'plural' is used as database table name
		public label: string,
		public labelPlural: string
	) { }

	toString(): string {

		return this.plural;

	}

}

export const AppEntity: Record<EntityType, EntityName> = {

	[EntityType.bookmark]:		new EntityName('bookmark',		'bookmarks',		'Bookmark',		'Bookmarks'),
	[EntityType.note]: 			new EntityName('note',			'notes',			'Note',			'Notes'),
	[EntityType.noteContent]: 	new EntityName('note_content',	'note_content',		'Note Content',	'Note Content'),
	[EntityType.project]: 		new EntityName('project',		'projects',			'Project',		'Projects'),
	[EntityType.quizEntry]: 	new EntityName('quiz_entry',	'quiz_entries',		'Quiz Entry',	'Quiz Entries'),
	[EntityType.quote]: 		new EntityName('quote',			'quotes',			'Quote',		'Quotes'),
	[EntityType.task]: 			new EntityName('task',			'tasks',			'Task',			'Tasks'),
	[EntityType.word]: 			new EntityName('word',			'words',			'Word',			'Words')

}
