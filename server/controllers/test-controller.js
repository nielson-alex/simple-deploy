const Animal = require('../../src/models/prove03-model');
// const host = "10.0.0.249";
// const database = "postgres";
// const schema = "test";
const host = "pg.eqxnutra.com";
const database = "equinox";
const schema = "sandbox";
const user = "postgres";
const password = "";
const pgPort = 5432;
const PgPool = require("pg").Pool;

function setUpPool() {
    const Pool = require("pg").Pool;
    const pool = new Pool({
        // connectionString: process.env.DATABASE_URL || `postgresql://postgres:<>@pg.eqxnutra.com:5432/equinox`,
        connectionString: process.env.DATABASE_URL || `postgresql://${user}:<${password}>@${host}:${pgPort}/${database}`,
        ssl: process.env.DATABASE_URL ? true : false
    })
    // const pool = new Pool({
    //     user: "postgres",
    //     host: host,
    //     database: database,
    //     password: "",
    //     port: pgPort,
    // });

    return pool;
}

exports.getAnimals = function (request, response, next) {
    const query = `
        SELECT  *
        FROM    equivoice.users
    `;

    new Promise(function (resolve, reject) {
        setUpPool().query(query,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                if (results) {
                    if (results.rows) {
                        response.send(results.rows);
                    } else {
                        response.send({ "oh": "no" });
                    }
                } else {
                    response.send({ "oh": "no" });
                }
            });
    });






    // const page = req.query.page;
    // console.log('page', page);
    // let totalItems;

    // console.log("entered /animals/animals");

    // Animal.find()
    //     .countDocuments()
    //     .then(numProducts => {
    //         totalItems = numProducts;

    //         return Animal.findOne()
    //         // .skip((20 - 1) * 20)
    //         // .limit(20);
    //     })
    //     .then(animals => {
    //         console.log("animals:", animals);
    //         console.log("");
    //         res.send({ "animals": animals });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}