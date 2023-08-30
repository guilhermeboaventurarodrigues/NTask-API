const logger = require("../logger.js")

module.exports = {
  db: {
    database: "ntask",
    username: "",
    password: "",
    params: {
      dialect: "sqlite",
      storage: "ntask.sqlite",
      logging:	(sql)	=>	{
        logger.info(`[${new Date()}]	${sql}`);
      },
      define: {
        underscored: true,
      },
    },
  },
  jwt: {
    secret: "12345",
    options: { session: true },
  },
};
