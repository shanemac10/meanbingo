//=========== NODE SERVER ==========//
const express = require("express"),
  path = require("path"),
  bodyParser = require('body-parser'),
  app = express(),
  userlist = {}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static( __dirname + '/public/dist' ));

require('./server/config/mongoose'); // imports models and their controllers and connects to MongoDB
require('./server/config/routes.js')(app) // imports routing to direct http traffic to the propper controller
const boards = require('./server/controllers/boards.js');

var server = app.listen(8080, function() {
    console.log("\033[0;37mListening on port 8080, why not! - \033[1;31m (V)(°m°)(V)\033[0;37m");
})
var io = require('socket.io').listen(server);

//=== SOCKET COMMUNICATION ===//
io.sockets.on('connection', function (socket) { console.log("Client/socket is connected! - ", socket.id);
    
    socket.on("whatsMySocket", function(){
        socket.emit("youAreOn", {"socket_id" : socket.id});
    })


    socket.on("updateTheUserlist", function( user_id, username, status){
        userlist[user_id] = {username: username, user_id: user_id ,socket_id: socket.id , status: status};
        io.emit("hereIsAListOfAvailableUsers", userlist); //something changed, so emit update to everyone
        // socket.emit("youAre", {"socket_id" : socket.id});
    })
    socket.on( "giveMeAListOfAvailableUsers", function (){ console.log( "Got a single request for a list of available users");
        socket.emit( "hereIsAListOfAvailableUsers", userlist); // single user asking and responded to
    })

    //=== STATUS CHANGES ===//
    socket.on("setMeToReady",function(user_id = null){
        if(userlist[user_id]){
            userlist[user_id]["status"]= "READY";
            io.emit( "hereIsAListOfAvailableUsers", userlist);
        } else {
            console.log("ERROR : setMeToReady", user_id," +++ ", userlist)
        }
    })
    socket.on("setMeToNotReady",function(user_id = null){
        if(userlist[user_id]){
            userlist[user_id]["status"]= "NOT_READY";
            io.emit( "hereIsAListOfAvailableUsers", userlist);           
        } else {
            console.log("ERROR : setMeToNotReady", user_id," +++ ", userlist)
        }
    })
    socket.on("setMeToPlaying",function(user_id = null){
        if(userlist[user_id]){
            userlist[user_id]["status"]= "PLAYING";
            io.emit( "hereIsAListOfAvailableUsers", userlist);            
        } else {
            console.log("ERROR : setMeToPlaying", user_id," +++ ", userlist)
        }
    })

    //=== GAME COMMUNICATION ===//
    socket.on("playBingo", function(game_info){ console.log("got playBingo...");
        let users = game_info['ready_users'];
        let bingoGame = boards.getOne(game_info["slate"]);

        for(let user = 0; user < users.length; user++){ // makes cards for each user
            users[user]["card"] = makeARandomizedCopy(bingoGame.board);
            bingoGame["users"].push(users[user]);
        }
        for(let x = 0; x < users.length; x++){ // tells the users to redirect to a game
            io.to( users[x]['socket_id']).emit('goToGame', { game_id: bingoGame._id, game_name: bingoGame.name });
        }
        // console.log("BINGOGAME : ", bingoGame)
    })
    
    socket.on("iHaveABingo", function(game_info){
        boards.gameoverOneById(game_info, function(gameover){
            // this will go through the gameover users array and get user_id,
            // then get the current socket_id (in case it changed) to emit 
            // to the players in gameover - it also sets their status to NOT_READY
            // proactively, in case they left the game 
            for(let x = 0; x < gameover.users.length; x++){
                io.to(userlist[gameover.users[x].user_id].socket_id)
                .emit("gameOver", game_info)
                // userlist[gameover.users[x].user_id].status = "NOT_READY";
            }
        })

    })


    
    
    
    
    socket.on( "disconnect", function (){ console.log( 'Someone disconnected! --> '  + socket.id);
        for (user in userlist){
            if(userlist[user].socket_id == socket.id){
                delete userlist[user];
                io.emit( "hereIsAListOfAvailableUsers", userlist);
                break;
            }
        }
    })  
}) //END SOCKETS

makeARandomizedCopy = function(arr){ //used to create randomized cards for each user in a game
    let copy = arr.slice(0);
    let returnMe = [];
    while(returnMe.length < 25){
        returnMe.push( 
            copy.splice( Math.floor(Math.random()*copy.length), 1 )[0] 
        ) //splice returns an Array, [0] get's the object out of the Array, since we are only pulling 1 positon.
    }
    return returnMe;
}

// npm i socket.io-client --save
// npm i @types/socket.io-client --save

//io.to(socketid).emit('message', 'for your eyes only');