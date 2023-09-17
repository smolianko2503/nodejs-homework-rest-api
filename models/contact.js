const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const { regexpEmail, regexpPhone } = require("../schemas/regexps");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: regexpEmail,
    },
    phone: {
      type: String,
      match: regexpPhone,
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

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact };
