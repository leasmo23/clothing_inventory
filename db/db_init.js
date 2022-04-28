const db = require("./db_connection");

// delete table if it already exists
const drop_clothes_table_sql = "DROP TABLE IF EXISTS clothes";

db.execute(drop_clothes_table_sql);

//create table w suitable columns and such
const create_clothes_table_sql = `
CREATE TABLE clothes(
    item   VARCHAR(45) NOT NULL,
    quantity INT NOT NULL,
    description VARCHAR(150) NULL,
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id));
`

db.execute(create_clothes_table_sql);

// add some sample data to the table
const insert_clothes_table_sql = `
    INSERT INTO clothes
        (item, quantity, description)
    VALUES
        (?, ?, ?)`

db.execute(insert_stuff_table_sql, ["Pink pants", 2, "bleh"]);

db.execute(insert_stuff_table_sql, ["While shirt", 2, null]);

db.end();