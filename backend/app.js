import connectToDB from "./database/database.js";
connectToDB();

import express from "express";
import Router from "./routes/routes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Router);

export default app;
