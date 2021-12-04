const mongoose = require("mongoose");
const WorkExperience = require("../models/WorkExperience");

/* GET */
exports.getAllAnimalsTest = function (request, response, next) {
    const page = request.query.page;
    let totalItems;

    WorkExperience.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return WorkExperience.find();
            // return Animal.find({ "_id": new mongoose.Types.ObjectId("60b2cb3847c44052a8042203") })
            // .skip((20 - 1) * 20)
            // .limit(20);
        })
        .then(entries => {
            response.send({ "work_experience": entries });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getWorkExperienceTest = function (request, response, next) {
    let totalItems;

    WorkExperience.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return WorkExperience.find();
            // return WorkExperience.find({ "_id": new mongoose.Types.ObjectId("60b2cb3847c44052a8042203") })
            // .skip((20 - 1) * 20)
            // .limit(20);
        })
        .then(workExperience => {
            response.send({ "work experience": workExperience });
        })
        .catch(err => {
            console.log(err);
        });
}

/* POST */
exports.postAddTest = function (request, response, next) {
    const companyName = request.body.company_name;
    const startMM = request.body.start_mm;
    const startMMMM = request.body.start_mmmm;
    const startYY = request.body.start_yy;
    const startYYYY = request.body.start_yyyy;
    const title = request.body.title;
    const responsibilities = request.body.responsibilities;
    let errorMessage = '';

    const workExperience = new WorkExperience({
        // _id: '60a94baf496a2f42e476dfe9', // For testing server error
        company_name: companyName,
        start_mm: startMM,
        start_mmmm: startMMMM,
        start_yy: startYY,
        start_yyyy: startYYYY,
        title: title,
        responsibilities: responsibilities
    });

    workExperience.save()
        .then(result => {
            response.send({ "status": "New entry successfully added" });
        })
        .catch(err => {
            console.log(err);

            response.send({ "status": "Error" });
        });

}