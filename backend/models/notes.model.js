import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    notes: [
      {
        title: {
          type: String,
          required: [true, "Name is required"],
          maxLength: [20, "Title Length Should Not be more than 20 Character."],
        },
        note: String,
      },
    ],
  },

  { timestamps: true }
);

const model = mongoose.model("Note", NotesSchema);
export default model;
