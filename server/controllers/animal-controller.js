const Animal = require('../models/prove03-model');
const catPhotos = require('../data/cat-photos');
const dogPhotos = require('../data/dog-photos');
const ferretPhotos = require('../data/ferret-photos');
const ITEMS_PER_PAGE = 2;

/* --- GET Functions --- */
exports.getIndex = (req, res, next) => {
    let featuredAnimal = { _id: 0, name: '', imageUrl: '', description: '', species: '', breed: '', sex: '', age: 0.00, price: 0.00 };

    exports.getAnimals = (req, res, next) => {
        const page = req.query.page;
        console.log('page', page);
        let totalItems;

        Animal.find()
            .countDocuments()
            .then(numProducts => {
                totalItems = numProducts;

                return Animal.find()
                    .skip((page - 1) * ITEMS_PER_PAGE)
                    .limit(ITEMS_PER_PAGE);
            })
            .then(animals => {
                res.render('pages/prove03/animals', {
                    path: '/animals',
                    title: 'All Animals',
                    animals: animals,
                    isAuthenticated: req.session.isLoggedIn,
                    currentPage: parseInt(page, 10),
                    hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                    hasPreviousPage: page > 1,
                    nextPage: parseInt(page, 10) + 1,
                    prevPage: parseInt(page, 10) - 1,
                    lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
}