const { Schema, Types } = require("mongoose");
const dateInfo = require ("../utils/dateinfo");

const responseSchema = new Schema(
    {
        responseId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        responseBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
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

module.exports = responseSchema;