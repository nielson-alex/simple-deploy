const Animal = require('../../src/models/prove03-model');

exports.getAnimals = function (req, res, next) {
    const page = req.query.page;
    console.log('page', page);
    let totalItems;

    console.log("entered /animals/animals");

    Animal.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;

            return Animal.findOne()
            // .skip((20 - 1) * 20)
            // .limit(20);
        })
        .then(animals => {
            console.log("animals:", animals);
            console.log("");
            res.send({ "animals": animals });
        })
        .catch(err => {
            console.log(err);
        })
}