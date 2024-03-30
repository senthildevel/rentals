const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');


Fawn.init("mongodb://localhost/febbatch-crud");

const router = express.Router();

// Fawn / https://mongoosejs.com/docs/transactions.html

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut'); // desc
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);



  // if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
  //   return res.status(400).send('Invalid Customer ID.');
  // }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  // if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
  //   return res.status(400).send('Invalid Movie ID.');
  // }


  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  rental = await rental.save();

  movie.numberInStock--;
  movie.save();




  /*try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, {
        $inc: {
          numberInStock: -1
        }
      })
      .run();
  } catch (ex) {
    res.status(500).send('Soemthing failed.. ')
  }
  */


  res.send(rental);


});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 