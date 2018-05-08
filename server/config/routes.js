//=========== ROUTING TO CONTROLLERS ==========//
const path = require("path")
      boards = require('../controllers/boards') // imports the controllers for boards

module.exports = function(app){
    
   
    app.get('/board/:game_id/:user_id', function(req, res) { // 
        boards.getGameCardForUser(req, res);
    })
    app.get('/board', function(req, res) { // 
        boards.getOne(req, res);
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/index.html"))
    })


} //end module.exports



    // FOR NOTES
    
    // authors = require('../controllers/authors'), // imports the controllers for authors
    // quotes = require('../controllers/quotes') // imports the controllers for quotes


    // app.get('/author', function(req, res) { // serves up the full collection
    //     authors.getAll(req, res);
    // })
      
    // app.post('/author', function(req, res) { // adds into the database
    //     authors.postOne(req, res);
    // })
      
    // app.get('/author/:id', function(req, res) { // displays information about one author
    //     authors.getOne(req, res);
    // })
      
    // app.post('/author/:id/quote', function(req, res) { // get the author, creates quote, and adds to the author.quotes[]
    //     authors.addQuote(req, res);
    // })

    // app.put('/author/:id', function(req, res) { // updates the author name/info
    //     authors.updateOne(req, res);
    // })
      
    // app.delete('/author/:id', function(req, res) { // deletes an author form the database.
    //     authors.deleteOne(req, res);
    // })
    
    // app.put('/quote/:q_id', function(req, res) { // adds the value of num (1 or -1) to the quote.rank
    //     quotes.updateRank(req, res);
    // })
    
    // app.delete('/quote/:q_id', function(req, res) { // deletes a quote from the database.
    //     quotes.deleteOne(req, res);
    // })