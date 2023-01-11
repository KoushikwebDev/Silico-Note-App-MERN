import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  URI: process.env.URI,
};

export default config;
