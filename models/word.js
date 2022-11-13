const { Schema, model } = require("mongoose");
// const responseSchema = require("./response");
const dateInfo = require("../utils/dateinfo");
const Reaction = require("./reaction");
// const User = require("./user");

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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: [Reaction.schema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


const Word = model("Word", wordSchema);

module.exports = Word;
