const express = require("express");
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const host = "10.0.0.249";
const database = "postgres";
// const schema = "sandbox";
let pgPort = 5432;

function setUpPool() {
    const Pool = require("pg").Pool;
    const pool = new Pool({
        user: "postgres",
        host: host,
        database: database,
        password: " ",
        port: pgPort,
    });

    return pool;
}

app.use(express.static("build"));
app.use(router.get("/get_location_groups", function (request, response, next) {
    const query = `
        SELECT      *
        FROM        test.test
        ORDER BY    id ASC 
    `;

    new Promise(function (resolve, reject) {
        setUpPool().query(query,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                if (results.rows) {
                    response.send(results.rows);
                    // response.send({ "WHAT": "OKAY" });
                }
            });
    });
}));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));