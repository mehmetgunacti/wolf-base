import { LANG } from 'blueprints';

export function resolveLang(name: string): LANG {

	return 'en' === name? 'en' : 'tr';

}
