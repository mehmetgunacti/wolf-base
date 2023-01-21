import { LANG } from 'lib';

export function resolveLang(name: string): LANG {

	return 'en' === name? 'en' : 'tr';

}
