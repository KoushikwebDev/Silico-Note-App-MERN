import express from "express";
import { Home } from "../controller/noteApp.controller.js";

const Router = express();

Router.get("/home", Home);

export default Router;
