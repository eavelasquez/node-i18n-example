import i18n from 'i18n';
import path from 'path';

i18n.configure({
  locales: ['en', 'es'],
  defaultLanguage: 'en',
  queryParameter: 'lang',
  directory: path.join('./', 'locales')
});

export default i18n;