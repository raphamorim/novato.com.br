/*
 * Config environments.
 */
var Config = {};

/*
 * Set current environment.
 */
Config.env = process.env.NODE_ENV || "development";

/*
 * Environment: Test.
 */
Config.test = {
  name: "test",
  mongo: "mongodb://localhost/newbie_test",
  defaultUrl: "http://localhost",
  serverPort: 8012,
  logNamespace: "test"
};
/*
 * Environment: Development.
 */
Config.development = {
  name: "development",
  mongo: "mongodb://localhost/newbie",
  defaultUrl: "http://localhost",
  serverPort: 8012,
  logNamespace: "development"
};
/*
 * Environment: Production.
 */
Config.production = {
  name: "production",
  mongo: "mongodb://localhost/newbie",
  defaultUrl: "http://localhost",
  serverPort: 8012,
  logNamespace: "production"
};

config = Config[Config.env];
config.env = Config.env;
exports.config = config;
