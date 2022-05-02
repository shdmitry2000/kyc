import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
//import { version } from "../../package.json";
import log from "./logger";
//import swaggerDocument from './utils/swagger.json';
const { dirname } = require('path');
const appDir = dirname(require.main.filename);


const options= swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
        title: 'My API',
        description: 'Description',
      },
//    components: {
//      securitySchemas: {
//        bearerAuth: {
//          type: "http",
//          scheme: "bearer",
//          bearerFormat: "JWT",
//        },
//      },
//    },
//    security: [
//      {
//        bearerAuth: [],
//      },
//    ],
  },
//  apis: ["./src/routes.js"],
  apis: [appDir+"/app.js",appDir+'/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app , port ) {
//function swaggerDocs(app : Express, port : number) {

  log.info(appDir)
  log.info(__dirname+"/../app.js")
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec ,{ explorer: true }));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;

