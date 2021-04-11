const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');


//schema for pizza model, define the fields with specific data types
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)

    },
    size: {
      type: String,
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
      getters:true
    },
    id: false,
  }
);
// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
