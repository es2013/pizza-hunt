const { Schema, model } = require('mongoose');

//schema for pizza model, define the fields with specific data types
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    size: {
        type: String,
        default: 'Large'
      },
    toppings: [] //indicates an array as data type
})

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;