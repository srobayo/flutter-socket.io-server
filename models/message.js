const { Schema, model } = require("mongoose");

const MessageScheme = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    para: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageScheme.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("Message", MessageScheme);
