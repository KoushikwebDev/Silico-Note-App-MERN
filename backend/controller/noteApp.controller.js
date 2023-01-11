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

  existingNote.notes.push({ title, note });

  existingNote.save({ validateBeforeSave: false });

  sendResponse(res, existingNote);
});

export const getNotes = asyncHandler(async (_req, res) => {
  const notes = await NoteSchema.find();

  if (!notes) {
    throw new CustomError("Notes not found", 404);
  }

  sendResponse(res, notes);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const { id } = req.params;

  if (!(email && id)) {
    throw new CustomError("All fields are required", 400);
  }

  let allNotes = await NoteSchema.findOne({ email });

  //   console.log(allNotes.notes[0].id);

  let newArr = allNotes.notes.filter((item) => {
    return item.id !== id;
  });
  //   console.log(newArr);

  allNotes.notes = newArr;

  allNotes.save({ validateBeforeSave: false });

  sendResponse(res, allNotes);
});
