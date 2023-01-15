import NoteSchema from "../models/notes.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import sendResponse from "../utils/sendResponse.js";

export const Home = (_req, res) => {
  res.status(200).json({
    message: "Hello Silico Note App",
  });
};

export const addNote = asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  if (!(email && name)) {
    throw new CustomError("All fields are required", 400);
  }
  const existingNote = await NoteSchema.findOne({ email });

  if (existingNote) {
    throw new CustomError("user notes already exists", 400);
  }

  let data = {
    email,
    notes: [{ title: `Hello ${name}`, note: "Welcome to Silico Note App." }],
  };

  const newNote = await NoteSchema.create(data);
  await newNote.save({ validateBeforeSave: false });

  sendResponse(res, newNote);
});

export const updateNote = asyncHandler(async (req, res) => {
  const { title, note, email } = req.body;

  if (!(title && note && email)) {
    throw new CustomError("All fields are required", 400);
  }

  const existingNote = await NoteSchema.findOne({ email });

  if (!existingNote) {
    throw new CustomError("user not found", 400);
  }

  existingNote.notes.unshift({ title, note });

  await existingNote.save({ validateBeforeSave: false });

  sendResponse(res, existingNote);
});

export const getNotes = asyncHandler(async (req, res) => {
  const { email } = req.params;
  if (!email) {
    throw new CustomError("email is required", 404);
  }
  console.log(email);
  const notes = await NoteSchema.find({ email });

  if (!notes) {
    throw new CustomError("Notes not found", 404);
  }

  res.status(200).send(notes);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { email, id } = req.params;

  if (!(email && id)) {
    throw new CustomError("All fields are required", 400);
  }

  let allNotes = await NoteSchema.findOne({ email });

  let newArr = allNotes.notes.filter((item) => {
    return item.id !== id;
  });

  allNotes.notes = newArr;

  await allNotes.save({ validateBeforeSave: false });

  sendResponse(res, allNotes);
});

export const editNote = asyncHandler(async (req, res) => {
  const { title, note, email } = req.body;
  const id = req.params.id;

  if (!(title && note && email && id)) {
    throw new CustomError("All fields are required", 400);
  }

  const existingNote = await NoteSchema.findOne({ email });

  if (!existingNote) {
    throw new CustomError("user not found", 400);
  }
  let filterNotes = existingNote.notes.filter((note) => {
    return note.id !== id;
  });
  let singleOne = existingNote.notes.filter((note) => {
    return note.id == id;
  });

  let newValue = {
    title,
    note,
    CrgeatedAt: singleOne.CrgeatedAt,
    UpdatedAt: Date.now(),
  };

  let finalNotes = [newValue, ...filterNotes];

  existingNote.notes = finalNotes;

  await existingNote.save({ validateBeforeSave: false });

  sendResponse(res, existingNote);
});
