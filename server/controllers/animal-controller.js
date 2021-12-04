const mongoose = require("mongoose");
const Animal = require("../models/Animals");

/* GET */
exports.getAnimals = function (request, response, next) {
    Animal.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return Animal.find();
            // return Animal.find({ "_id": new mongoose.Types.ObjectId("60b2cb3847c44052a8042203") })
            // .skip((20 - 1) * 20)
            // .limit(20);
        })
        .then(animals => {
            response.send({ "animals": animals });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAnimalDetails = (req, res, next) => {
    const animalId = req.params._id;

    Animal.findById(new mongoose.Types.ObjectId(animalId))
        .then(animal => {
            res.send({ "data": animal });
        });
}

/* POST */
exports.postAddAnimal = function (request, response, next) {
    const name = request.body.name;
    let imageUrl = '';
    const species = request.body.species;
    const breed = request.body.breed;
    const age = request.body.age;
    const sex = request.body.sex;
    const description = request.body.description;
    const price = request.body.price;
    let errorMessage = '';

    const imageArray = Animal.find()
        .then(animals => animals.map(animal => animal.imageUrl))
        .catch(err => {
            console.log(err);
        });

    // switch (species.toLowerCase()) {
    //     case 'cat':
    //         imageUrl = catPhotos[Math.floor(Math.random() * catPhotos.length)];
    //         break;
    //     case 'dog':
    //         imageUrl = dogPhotos[Math.floor(Math.random() * dogPhotos.length)];
    //         break;
    //     case 'ferret':
    //         imageUrl = ferretPhotos[Math.floor(Math.random() * ferretPhotos.length)];
    //         break;
    //     default:
    //         break;
    // }

    if (name === '' || species === '' || breed === '' || age < 0 || sex === '' || description === '' || price < 0) {
        if (name === '') {
            errorMessage = 'Animal name must be included';
        }
        else if (species === '') {
            errorMessage = 'Animal name must be included';
        } else if (breed === '') {
            errorMessage = 'Animal breed must be included';
        } else if (age < 0) {
            errorMessage = 'Animal age must be included';
        } else if (sex === '') {
            errorMessage = 'Animal sex must be included';
        } else if (description === '') {
            errorMessage = 'Animal description must be included';
        } else if (price < 0) {
            errorMessage = 'Animal adoption price must be included';
        }

        response.send({ "status": "New entry successfully added" });
    } else {
        const animal = new Animal({
            // _id: '60a94baf496a2f42e476dfe9', // For testing server error
            name: name,
            imageUrl: imageUrl,
            species: species,
            breed: breed,
            age: age,
            sex: 'female',
            description: description,
            price: price
        });

        animal.save()
            .then(result => {
                response.send({ "status": "New entry successfully added" });
            })
            .catch(err => {
                console.log(err);

                response.send({ "status": "Error" });
            });
    }
}