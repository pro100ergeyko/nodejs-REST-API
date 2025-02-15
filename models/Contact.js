import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError } from "./hooks.js";
const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegexp =
  /^((\+)?(3)?(8)?[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError);

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(nameRegexp).required().messages({
    "any.required": "field 'name' is missing",
    "string.pattern.base":
      "Name may contain only letters, apostrophe, dash, and spaces. For example, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "field 'email' is missing",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "any.required": "field 'phone' is missing",
    "string.pattern.base":
      "Phone number must be a valid phone number for region UA, digits and can contain spaces, dashes, parentheses and can start with +",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

export const schemas = { contactAddSchema, updateFavoriteSchema };

const Contact = model("contact", contactSchema);

export default Contact;
