const bodyParser = require("body-parser");
const cors = require("cors")
const logger = require('./logger.js')
const morgan = require("morgan")

module.exports = (app) => {
  app.set("port", 3000);
  app.set("json	spaces", 4);
  app.use(morgan('common',	{
    stream:	{
        write:(log)	=> logger.info(log)
    }
  }));
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use(cors({
    origin:[''], //Endereço do endereço que vai ser autorizado a interagir com nossa API
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
};
