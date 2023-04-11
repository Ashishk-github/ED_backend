const dotenv = require("dotenv");

dotenv.config();
const config = {
  app: {
    db_url: process.env.DB_URL,
    app_key: process.env.APP_KEY,
    client_secret:process.env.CLIENT_SECRET,
    client_id:process.env.CLIENT_ID,
  },
};
process.var = config;
module.exports = { config };
