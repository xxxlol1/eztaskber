import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 3000,
  dbUserC: process.env.DB_USERC || "",
  dbPasswordC: process.env.DB_PASSWORDC || "",
  dbServerC: process.env.DB_SERVERC || "",
  dbDatabaseC: process.env.DB_DATABASEC || "",
};
