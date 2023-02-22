import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El campo title es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "El campo description es obligatorio"],
    },
    imgUrl: {
      type: String,
      required: [true, "El campo imgUrl es obligatorio"],
    },
  },
  { timestamps: true }
);

export const postModel = model("post", postSchema);
