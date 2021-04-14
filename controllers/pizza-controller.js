const { Pizza } = require('../models');

const pizzaController = {
  // create the find methods
  //get all pizzas-- callback function for the GET /api/pizzas route
  getAllPizza(req,res) {
    Pizza.find({})
    .populate({
      path: 'comments',
      select: '-__v'
    }).select('-__v')
    .sort({ _id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
  },
//get one pizza by id. destructured params out of it because thats the only data we need for the request to be fulfilled
getPizzaById({ params }, res) {
  Pizza.findOne({ _id: params.id })
  .populate({
    path: 'comments',
    select: '-__v'
  })
  .select('-__v')
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
},
//method for POST /api/pizzas
// createPizza
createPizza({ body }, res) {
  Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.json(err));
},
  //Update with PUT /api/pizzas/:id
  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

// delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;