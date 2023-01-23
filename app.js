const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const db = require("./database/db");
const userRouter = require("./routes/userRoute");
const deviceRouter = require("./routes/deviceRoute");
app.use(express.json());
const trackRouter = require("./routes/trackRoute");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/basicInfo');
var options = {
    swaggerOptions: {
        validatorUrl: null,
        url: 'http://petstore.swagger.io/v2/swagger.json'
    }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use("/users", userRouter);
app.use("/devices", deviceRouter);
app.use("/tracks", trackRouter);



db.then(() => {
  console.log("connected is done successfully");
  app.listen(port, () => {
    console.log(`server is running in port ${port}`);
  });
}).catch((err) => {
  console.log("something is wrong " + err);
  process.exit(1);
});
