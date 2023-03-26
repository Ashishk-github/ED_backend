const dotenv = require("dotenv");

dotenv.config();
const config = {
  app: {
    db_url: process.env.DB_URL,
    app_key: process.env.APP_KEY,
  },
};
module.exports = { config };
