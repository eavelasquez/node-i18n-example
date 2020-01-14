import i18n from './app/i18n.config.mjs';
import container from './app/container.mjs';

i18n.setLocale('en');
const app = container.resolve('app');

app.start().catch((err) => {
  console.warn(err);
  process.exit();
});

const localeService = container.resolve('localeService');

console.log(localeService.getLocales());
console.log(localeService.getCurrentLocale());
console.log(localeService.translate('Hello'));
console.log(localeService.translateN('You have %s message', 3));
