
// swagger
import swaggerAutogen from 'swagger-autogen';
const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};
const outputFile = "./utils/swagger.json";
const endpointsFiles = ['./routes/regulator.js','./routes/*.js']; // root file where the route starts.
swaggerAutogen(outputFile, endpointsFiles,doc);
//-----------end of swagger----

//export default swaggerAutogen;

