const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//schema for pizza model, define the fields with specific data types
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    comments: [
      {
        type: String,
        ref: "Comment",
      },
    ],
    toppings: [], //indicates an array as data type
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// get total count of comments and replies on retrieval with virtuals
PizzaSchema.virtual("commentCount").get(function () {
  //using reduce() to tally up every comment with replies
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
