const DATABASE_URL = "postgresql://postgres:password@pg.eqxnutra.com:5432/equinox";
function setUpPool() {
    const Pool = require("pg").Pool;
    let pool;


    if (process.env.DATABASE_URL) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        })
    } else {
        pool = new Pool({
            user: "postgres",
            host: "pg.eqxnutra.com",
            database: "equinox",
            password: "",
            port: 5432,
        });
    }

    return pool;
}

exports.getAnimals = function (request, response, next) {
    const query = `
        SELECT DISTINCT location_group_id,
                        location_group
        FROM			oms.warehouse_recode
        ORDER BY		location_group ASC
    `;

    new Promise(function (resolve, reject) {
        setUpPool().query(query,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                if (results.rows) {
                    response.send(results.rows);
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