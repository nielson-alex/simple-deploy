const express = require("express");
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const host = "pg.eqxnutra.com";
const database = "equinox";
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
    // const query = `
    //     SELECT DISTINCT location_group_id,
    //                     location_group
    //     FROM			oms.warehouse_recode
    //     ORDER BY		location_group ASC
    // `;

    // new Promise(function (resolve, reject) {
    //     setUpPool().query(query,
    //         function (error, results) {
    //             if (error) {
    //                 reject(error);
    //             }

    //             if (results.rows) {
    response.send({ "WHAT": "OKAY" });
    // }
    // });
    // });
}));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));