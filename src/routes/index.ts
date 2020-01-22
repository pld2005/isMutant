import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import DnaRouter from './DnaRouter';
let swaggerDoc: Object;

try {
    swaggerDoc = require('../../swagger.json');
} catch (error) {
    console.log('***************************************************');
    console.log('  Seems like you doesn\`t have swagger.json file');
    console.log('  Please, run: ');
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
    console.log('***************************************************');
}


export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/api', DnaRouter);

    

    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    } 

    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router);

}
