//set up the server
const express = require( "express" );
const logger = require("morgan" );
const app = express();
const port = 8080;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );


const db = require('./db/db_connection');

//defining middleware that logs all incoming requests.
app.use(logger("dev"));

// define middleware that serves static sources in the public director
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
} );

const read_clothes_all_sql = `
    SELECT
        id, item, quantity
    FROM 
        clothes
`
// define a route for the stuff inventory page
app.get( "/clothes", ( req, res ) => {
    db.execute(read_clothes_all_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.send(results);
    });
});

const read_clothes_item_sql = `
    SELECT
        id, item, description
    FROM
        clothes
    WHERE
        id = ?
`
// define a route for the item detail page
app.get( "/clothes/item:id", ( req, res ) => {
    db.execute(read_stuff_item_sql, [req.params.id],(error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.statusMessage(404).send(`No item found with id = "${req.paramus.id}"`);//not found
        else {
            let data = results[0];// results is still an array
            //{ item: __ , quantity:___ , description:___}
            res.render('item', data)
        }
    });
});
// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );