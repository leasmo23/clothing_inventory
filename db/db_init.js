const db = require("./db_connection");

// delete table if it already exists
const drop_clothes_table_sql = "DROP TABLE IF EXISTS clothes";

db.execute(drop_clothes_table_sql);

//create table w suitable columns and such
const create_clothes_table_sql = `
CREATE TABLE clothes(
    item   VARCHAR(45) NOT NULL,
    brand VARCHAR(45) NULL,
    location VARCHAR(45) NOT NULL,
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id));
`

db.execute(create_clothes_table_sql);

// add some sample data to the table
const insert_clothes_table_sql = `
    INSERT INTO clothes
        (item, brand, location)
    VALUES
        (?, ?, ?)`

db.execute(insert_clothes_table_sql, ["Pink pants", "PacSun", "Left Closet"]);

db.execute(insert_clothes_table_sql, ["While shirt", "Brandy", "Left Column"]);

db.execute(insert_clothes_table_sql, ["Wide Leg Jeans", "Levi's" , "Upper Rack"]);

db.execute(insert_clothes_table_sql, ["Navy Sweatpants", "BCA Merch", "Right Column"]);

db.execute(insert_clothes_table_sql, ["Pink shirt", null , "Left Column"]);

/**** Read the sample items inserted ****/

const read_clothes_table_sql = "SELECT * FROM clothes";

db.execute(read_clothes_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'clothes' initialized with:")
        console.log(results);
    }
);

db.end();