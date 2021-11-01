const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const host = "pg.eqxnutra.com";
// const host = "10.0.0.249";
const database = "equinox";
// const database = "postgres";
const schema = "";
// const schema = "sandbox";
let pgPort = 5432;

function setUpPool() {
    const Pool = require("pg").Pool;
    const pool = new Pool({
        user: "postgres",
        host: host,
        database: database,
        password: "",
        port: pgPort,
    });

    return pool;
}

app.use(cors({
    origin: "*",
    methods: "DELETE, GET, OPTIONS, PATCH, POST, PUT"
}));
app.use(express.static("build"));
app.use(express.static(__dirname + "/get_location_groups"), function (request, response, next) {
    const query = `
            SELECT      id
                        ,first_name
                        ,last_name
                        ,department
                        ,start_date
                        ,drives
                        ,additional_equipment
                        ,email_groups
                        ,shared_email_access
                        ,needs_email
                        ,needs_vpn
                        ,needs_phone
                        ,needs_computer
                        ,needs_fishbowl_access
                        ,is_contractor
                        ,is_remote
                        ,is_temp
                        ,temp_duration
                        ,additional_comments
            FROM        equivoice.new_hire_info
            WHERE       active = true
            ORDER BY    last_name ASC
        `;

    console.log("query:", query);

    new Promise(function (resolve, reject) {
        // response.send({ "Sasha breed": "Calico" });

        setUpPool().query(query,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                if (results?.rows?.length > 0) {
                    console.log("results.rows:", results.rows);
                    const data = results.rows;

                    response.send({ "data": data });
                } else {
                    response.send({
                        "error": "No results found"
                    });
                }
            });
    });

    // console.log("called right API");
    // response.send({ "KEY": "VALUE" });
});
// app.use(router.get("/get_location_groups]", function (request, response, next) {
//     // const query = `
//     //     SELECT DISTINCT location_group_id,
//     //                     location_group
//     //     FROM			oms.warehouse_recode
//     //     ORDER BY		location_group ASC
//     // `;

//     // new Promise(function (resolve, reject) {
//     //     setUpPool().query(query,
//     //         function (error, results) {
//     //             if (error) {
//     //                 reject(error);
//     //             }

//     //             if (results.rows) {
//     response.send({ "WHAT": "OKAY" });
//     // }
//     // });
//     // });
// }));
app.listen(PORT, () => {
    console.log("express.static(__dirname + \"/public\")", express.static(__dirname, + "/public"));
    console.log(`Listening on port ${PORT}`)
});