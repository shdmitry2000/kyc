import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

//import swaggerJsdoc from 'swagger-jsdoc';
//import swaggerUi  from 'swagger-ui-express'
//import swaggerDocument from './swagger.json';


import regulatorRouter from './routes/regulator';
//import proccessRouter from './routes/proccess';
import log from "./utils/logger";

const port=8081;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

import swaggerDocs from './utils/swagger'

app.use(cors({ origin: '*', credentials: true }));




/**
* @openapi
* /healthcheck:
*  get:
*     tags:
*     - Healthcheck
*     description: Responds if the app is up and running
*     responses:
*       200:
*         description: App is up and running
*/
app.get('/healthcheck', (req, res) => res.sendStatus(200));

app.use('/api', regulatorRouter);

//app.use('/proccess', proccessRouter);


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(res.statusCode || 500).send({ message: err.message });
});

const main = async () => {
    try {
      app.listen(port);
      swaggerDocs(app,port)
      log.info("Application started on port 8081");
    } catch (err) {
      process.exit(1);
    }
  };


  main().catch(console.error);

  export default app;