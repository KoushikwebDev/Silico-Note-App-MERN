import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  Home,
  updateNote,
} from "../controller/noteApp.controller.js";

const Router = express();

Router.get("/home", Home);

Router.post("/addnote", addNote);
Router.put("/updatenote", updateNote);
Router.get("/notes", getNotes);
Router.delete("/deletenote/:id", deleteNote);

export default Router;
