//set up the server
const express = require( "express" );
const logger = require("morgan" );
const app = express();
const port = process.env.PORT;

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );


const db = require('./db/db_pool');
// configure express to partse URL - encoded POSt request bodies(traditional forms)

app.use(express.urlencoded({extended : false}));

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
        id, item, brand, location
    FROM 
        clothes
`
// define a route for the stuff inventory page
app.get( "/clothes", ( req, res ) => {
    db.execute(read_clothes_all_sql, (error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else
            res.render("clothes", {inventory : results} );
            //inventory shape:
            //[
            //

            //
    });

});

const read_clothes_item_sql = `
    SELECT
        id, item, brand, location
    FROM
        clothes
    WHERE
        id = ?
`
// define a route for the item detail page
app.get( "/clothes/item/:id", ( req, res ) => {
    db.execute(read_clothes_item_sql, [req.params.id],(error, results) => {
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.statusMessage(404).send(`No item found with id = "${req.paramus.id}"`);//not found
        else {
            let data = results[0];// results is still an array
            //{ id: item: __ , quantity:___ , description:___}
            res.render('item', data)
        }
    });
});

const delete_clothes_sql = `
    DELETE 
    FROM 
        clothes 
    WHERE 
        id = ?
`
app.get("/clothes/item/:id/delete", (req, res) =>{
    db.execute(delete_clothes_sql, [req.params.id], (error, results) =>{
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/clothes");
        }
    })

})
const create_item_sql = `
INSERT INTO clothes
    (item, brand, location)
VALUES
    (?,?, ?)
`

    app.post("/clothes", (req, res) => {
    // to get the form input values:
   // req.body.name 
    // req.body.quantity
        db.execute(create_item_sql, [req.body.name, req.body.brand, req.body.location], (error, results) => {
            if (error)
                 res.status(500).send(error); //Internal Server Error
            else {
                 res.redirect("/clothes");   
            }
        });
})

const update_item_sql = `
    UPDATE
        clothes
    SET
        item = ?,
        brand = ?,
        location = ?
    WHERE 
        id = ?`

app.post("/clothes/item/:id", (req, res) => {
    db.execute(update_item_sql, [req.body.name, req.body.brand, req.body.location, req.params.id], (error, results) => {
            if (error)
                 res.status(500).send(error); //Internal Server Error
            else {
                 res.redirect(`/clothes/item/${req.params.id}`); 
            }
    });

})

// start the server
    app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
});