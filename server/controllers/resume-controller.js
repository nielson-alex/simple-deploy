const mongoose = require("mongoose");
const Animal = require("../models/Animals");
const WorkExperience = require("../models/WorkExperience");

/* GET */
exports.getAllWorkExperience = function (request, response, next) {
    const page = request.query.page;
    let totalItems;

    WorkExperience.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return WorkExperience.find();
        })
        .then(workExperience => {
            console.log("workExperience:", workExperience);
            console.log("");
            response.send({ "workExperience": workExperience });
        })
        .catch(err => {
            console.log(err);
        });
}

/* POST */
exports.postAddWorkExperience = function (request, response, next) {
    const company_name = request.body.company_name;
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const responsibilities = request.body.responsibilities;
    const start_mm = request.body.start_mm;
    const start_mmmm = request.body.start_mmmm;
    const start_yy = request.body.start_yy;
    const start_yyyy = request.body.start_yyyy;
    const title = request.body.title;

    let errorMessage = "";

    if (company_name === ""
        || first_name === ""
        || last_name === ""
        || responsibilities.length < 1
        || start_mm === ""
        || start_mmmm === ""
        || title === ""
    ) {
        if (company_name === '') {
            errorMessage = "Company name must be included";
        } else if (first_name === '') {
            errorMessage = "First name must be included";
        } else if (last_name === '') {
            errorMessage = "Last name must be included";
        } else if (responsibilities.length < 1) {
            errorMessage = "Must have at lesat one job responsibility";
        } else if (start_mm === "") {
            errorMessage = "Start month abbreviation must be included";
        } else if (start_mmmm === "") {
            errorMessage = "Start month must be included";
        }

        response.send({ "status": "New entry successfully added" });
    } else {
        const workExperience = new WorkExperience({
            // _id: '60a94baf496a2f42e476dfe9', // For testing server error
            company_name: company_name,
            first_name: first_name,
            last_name: last_name,
            responsibilities: responsibilities,
            start_mm: start_mm,
            start_mmmm: start_mmmm,
            start_yy: start_yy,
            start_yyyy: start_yyyy,
            title: title
        });

        workExperience.save()
            .then(result => {
                console.log('Created entry');
                response.send({ "status": "New entry successfully added" });
            })
            .catch(err => {
                console.log(err);

                response.send({ "status": "Error" });
            });
    }
}