const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const cors = require("cors");
var logger = require('morgan');
const dbConfig = require("./app/config/db.config");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var car = require("./app/routes/car.routes");
const uploadRoute = require('./app/routes/upload.routes');
router = express.Router();
var corsOptions = {
  origin: "http://localhost:8081"
};



const options = {
  swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "My  Application",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./app/routes/*.js"],
  };
  const swaggerSpecs = swaggerJsDocs(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(uploadRoute);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));


const db = require("./app/models");
const Role = db.role;
app.use("/car", car);
db.mongoose
  .connect('mongodb+srv://firas123:azerty123@constat.cpine.mongodb.net/constat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to firas application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
//require("./app/routes/car.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "assure"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'assure' to roles collection");
      });

      new Role({
        name: "SOS"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'SOS' to roles collection");
      });

      new Role({
        name: "assurance"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'assurance' to roles collection");
      });
    }
  });
}

