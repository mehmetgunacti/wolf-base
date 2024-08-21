export enum AppEntityType {

	bookmark	= 'bookmark',
	note		= 'note',
	noteContent	= 'noteContent',
	project		= 'project',
	quizEntry	= 'quizEntry',
	quote		= 'quote',
	task		= 'task',
	word		= 'word'

}

export class AppEntity {

	constructor(
		public name: string,
		public plural: string, // value of 'plural' is used as database table name
		public label: string,
		public labelPlural: string
	) { }

	toString()		: string { return this.plural; }
	get _sync()		: string { return this.plural + '_sync'; }
	get _remote()	: string { return this.plural + '_remote'; }
	get _trash()	: string { return this.plural + '_trash'; }

}

export const AppEntities: Record<AppEntityType, AppEntity> = {

	[AppEntityType.bookmark]:		new AppEntity('bookmark',		'bookmarks',		'Bookmark',		'Bookmarks'),
	[AppEntityType.note]: 			new AppEntity('note',			'notes',			'Note',			'Notes'),
	[AppEntityType.noteContent]: 	new AppEntity('note_content',	'note_content',		'Note Content',	'Note Content'),
	[AppEntityType.project]: 		new AppEntity('project',		'projects',			'Project',		'Projects'),
	[AppEntityType.quizEntry]: 		new AppEntity('quiz_entry',		'quiz_entries',		'Quiz Entry',	'Quiz Entries'),
	[AppEntityType.quote]: 			new AppEntity('quote',			'quotes',			'Quote',		'Quotes'),
	[AppEntityType.task]: 			new AppEntity('task',			'tasks',			'Task',			'Tasks'),
	[AppEntityType.word]: 			new AppEntity('word',			'words',			'Word',			'Words')

}
