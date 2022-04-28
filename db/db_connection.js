const mysql = require('mysql2');

const dbConfig = {
    host: "soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "leasmo23",
    password: "urtzy9acew72",
    database: "webapp2122t3_leasmo23",
    connectTimeout: 10000
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;