const { Schema, model } = require("mongoose");
const responseSchema = require("./response");
const dateInfo = require("../utils/dateinfo");

const wordSchema = new Schema(
  {
    wordText: {
      type: String,
      required: "You need to tell us what's the word!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateInfo(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    responses: [responseSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

responseSchema.virtual("responseCount").get(function () {
  return this.reactions.length;
});

const Response = model("Response", responseSchema);

module.exports = Response;
