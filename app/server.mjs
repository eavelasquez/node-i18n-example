import express from 'express';
import consolidate from 'consolidate';

export class Server {
  constructor({ i18nProvider }) {
    this.express = express();
    this.express.disable('x-powered-by');
    this.express.set('view engine', 'html');
    this.express.engine('html', consolidate.mustache);
    this.express.use(i18nProvider.init);
    this.express.use((req, res, next) => {
      // mustache helper
      res.locals.i18n = () => (text, render) => req.__(text, render);
      next();
    });
    this.express.get('/:index?', (req, res) => {
      const { name } = req.params;
        res.render('index', {
          'currentLocale': res.locale,
          'name': name || 'Theo',
          'hello': req.__('Hello'),
          'message': req.__('How are you?')
        });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      const http = this.express.listen(8000, () => {
        const { port } = http.address();
        console.info(`[p ${process.pid}] Listening on port ${port}`);
        resolve();
      });
    })
  }
}
