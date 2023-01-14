import express from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  Home,
  updateNote,
} from "../controller/noteApp.controller.js";

const Router = express();

Router.get("/home", Home);

Router.post("/addnote", addNote);
Router.put("/updatenote", updateNote);
Router.get("/notes/:email", getNotes);
Router.delete("/deletenote/:email/:id", deleteNote);
Router.put("/editNote/:id", editNote);

export default Router;
