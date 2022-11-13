const { Schema, Types, model } = require("mongoose");
const dateInfo = require("../utils/dateinfo");

const reactionSchema = new Schema(
  {
    // reactionId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    // },
    wordText: {
      type: String,
      required: "You need to tell us what's the word!",
      minlength: 1,
      maxlength: 280,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateInfo(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

reactionSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
