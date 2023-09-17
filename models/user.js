const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { regexpEmail } = require("../schemas/regexps");

const { handleMongooseError } = require("../helpers");

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: regexpEmail,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true
    }
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpEmail).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(regexpEmail).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
