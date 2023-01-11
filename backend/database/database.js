import mongoose from "mongoose";
import config from "../config/config.js";

const connectToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(config.URI, {
      useNewUrlParser: true,
      useunifiedTopology: true,
    })
    .then((conn) => {
      console.log(
        "Database Connection Successfully to " + conn.connection.host
      );
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

export default connectToDB;
