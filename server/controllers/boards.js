//=========== BOARDS CONTROLLER ==========//

const mongoose = require('mongoose'),
    Board = mongoose.model('Board'),
    board1 = {"name": "Conference Call",
    "board":[
        { "id": "0", "blurb":"Win-Win"},
        { "id": "1", "blurb":"Who just joined?"},
        { "id": "2", "blurb":"Can you email that?"},
        { "id": "3", "blurb":"I have to jump on a call"},
        { "id": "4", "blurb":"Echo or feedback squeel"},
        { "id": "5", "blurb":"Child or animal noises"},
        { "id": "6", "blurb":"Can everyone see my screen?"},
        { "id": "7", "blurb":"Is everyone on mute?"},
        { "id": "8", "blurb":"Sorry! I was on mute."},
        { "id": "9", "blurb":"Sorry I'm late"},
        { "id": "10", "blurb":"Sorry, go ahead"},
        { "id": "11", "blurb":"I think there's a lag"},
        { "id": "12", "blurb":"Can you repeat that?"},
        { "id": "13", "blurb":"Weather mentioned"},
        { "id": "14", "blurb":"Hit the ground running"},
        { "id": "15", "blurb":"Misuse of a word"},
        { "id": "16", "blurb":"At the end of the day"},
        { "id": "17", "blurb":"Question avoided"},
        { "id": "18", "blurb":"Double edged sword"},
        { "id": "19", "blurb":"Moving forward"},
        { "id": "20", "blurb":"No, go ahead"},
        { "id": "21", "blurb":"Questions comments concerns?"},
        { "id": "22", "blurb":"Cough"},
        { "id": "23", "blurb":"Awkward silence"},
        { "id": "24", "blurb":"Reusing a term, or analogy"},
        { "id": "25", "blurb":"Sports metaphore"},
        { "id": "26", "blurb":"Someone does an impression"},
        { "id": "27", "blurb":"I'll have to get back to you"},
        { "id": "28", "blurb":"A/V or technical issues"},
        { "id": "29", "blurb":"Next slide please"},
        { "id": "30", "blurb":"Let's move on"},
        { "id": "31", "blurb":"Low hanging fruit"},
        { "id": "32", "blurb":"On the same page"},
        { "id": "33", "blurb":"Did everone get the attachment?"},
        { "id": "34", "blurb":"Metrics"},
        { "id": "35", "blurb":"Optics"},
        { "id": "36", "blurb":"Best case scenario"},
        { "id": "37", "blurb":"Circle back"},
        { "id": "38", "blurb":"Touch base"},
        { "id": "39", "blurb":"In the loop"}
    ]},
    board2 = {"name": "Wal-Mart",
    "board":[
        { "id": "0", "blurb":"Pajama pants"},
        { "id": "1", "blurb":"Tramp-stamp tattoo"},
        { "id": "2", "blurb":"Buttcrack showing"},
        { "id": "3", "blurb":"Flip-flops with pants"},
        { "id": "4", "blurb":"Crocks"},
        { "id": "5", "blurb":"Rebel flag"},
        { "id": "6", "blurb":"Wearing NASCAR apparel"},
        { "id": "7", "blurb":"Wearing camoflage"},
        { "id": "8", "blurb":"Face tattoo"},
        { "id": "9", "blurb":"Lip ring"},
        { "id": "10", "blurb":"Tribal tattoo"},
        { "id": "11", "blurb":"Stitched jeans"},
        { "id": "12", "blurb":"Guy wearing rhinestones"},
        { "id": "13", "blurb":"Wearing NFL apparel"},
        { "id": "14", "blurb":"Knee-high socks and shorts"},
        { "id": "15", "blurb":"Bird inside store"},
        { "id": "16", "blurb":"Creepy mustache"},
        { "id": "17", "blurb":"Crying or whining child"},
        { "id": "18", "blurb":"Socks with sandles or crocks"},
        { "id": "19", "blurb":"Abandoned cart"},
        { "id": "20", "blurb":"Ballcap with fish hook"},
        { "id": "21", "blurb":"Hole ripped in T-shirt"},
        { "id": "22", "blurb":"T-shirt with cut-off sleves"},
        { "id": "23", "blurb":"Obease person using scooter"},
        { "id": "24", "blurb":"Eating food before paying"},
        { "id": "25", "blurb":"Completely unattended child"},
        { "id": "26", "blurb":"Unibrow"},
        { "id": "27", "blurb":"Someone with light beer"},
        { "id": "28", "blurb":"Adult with 3 or more kids"},
        { "id": "29", "blurb":"Talking loudly on cell-phone"},
        { "id": "30", "blurb":"Bluetooth earpiece"},
        { "id": "31", "blurb":"Grown-up wearing Disney apparel"},
        { "id": "32", "blurb":"Someone chasing their child"},
        { "id": "33", "blurb":"Mouth breather"},
        { "id": "34", "blurb":"Guy sporting pony/rat tail"},
        { "id": "35", "blurb":"Kool-Aid moustache"},
        { "id": "36", "blurb":"Couple w/ 100lbs weight diff"},
        { "id": "37", "blurb":"Old woman cleavage"},
        { "id": "38", "blurb":"Muffin top skin showing"},
        { "id": "39", "blurb":"Wearing American flag"},
        { "id": "40", "blurb":"Orange safety vest"},
        { "id": "41", "blurb":"Leopard print"},
        { "id": "42", "blurb":"Basketball shorts"},
        { "id": "43", "blurb":"Tucked in T-shirt"},
        { "id": "44", "blurb":"Missing teeth or dentures"},
        { "id": "46", "blurb":"Pentecostal in a jean skirt"},
        { "id": "47", "blurb":"Word across butt on shorts"},
        { "id": "48", "blurb":"Cowboy boots"},
        { "id": "49", "blurb":"Religious T-shirt"},
        { "id": "50", "blurb":"Someone oblivious to being in your way"}
    ]},
    board3 = {"name": "Coding Dojo's Demo Night",
    "board":[
        { "id": "0", "blurb":"Cohort"},
        { "id": "1", "blurb":"Bootstrap"},
        { "id": "2", "blurb":"Spring-Boot"},
        { "id": "3", "blurb":"Deploy"},
        { "id": "4", "blurb":"Framework"},
        { "id": "5", "blurb":"Back-end"},
        { "id": "6", "blurb":"Front-end"},
        { "id": "7", "blurb":"Technologies"},
        { "id": "8", "blurb":"Angular"},
        { "id": "9", "blurb":"ExpressJS"},
        { "id": "10", "blurb":"MongoDB"},
        { "id": "11", "blurb":"NodeJS"},
        { "id": "12", "blurb":"Python"},
        { "id": "13", "blurb":"Full-Stack"},
        { "id": "14", "blurb":"Django"},
        { "id": "15", "blurb":"API"},
        { "id": "16", "blurb":"To-Do List"},
        { "id": "17", "blurb":"C#  (C sharp)"},
        { "id": "18", "blurb":"jQuery"},
        { "id": "19", "blurb":"CSS"},
        { "id": "20", "blurb":"HTML"},
        { "id": "21", "blurb":"GitHub"},
        { "id": "22", "blurb":"MySQL"},
        { "id": "23", "blurb":"Flask"},
        { "id": "24", "blurb":"Algorithm"},
        { "id": "25", "blurb":"JavaScript"},
        { "id": "26", "blurb":"Responsive Design"},
        { "id": "27", "blurb":"Wireframe"},
        { "id": "28", "blurb":"In the real world"},
        { "id": "29", "blurb":"Database model"},
        { "id": "30", "blurb":"Relationship"},
        { "id": "31", "blurb":"Portfolio"},
        { "id": "32", "blurb":"Layout"},
        { "id": "33", "blurb":"Black-belt"},
        { "id": "34", "blurb":"Red-belt"},
        { "id": "35", "blurb":"Google"},
        { "id": "36", "blurb":"Belt Exam"},
        { "id": "37", "blurb":"REST-ful"},
        { "id": "38", "blurb":"Login and Registration"},
        { "id": "39", "blurb":"Array"},
        { "id": "40", "blurb":"Counter"},
        { "id": "41", "blurb":"Validatation"},
        { "id": "42", "blurb":"Something is randomly generated or selected"},
        { "id": "43", "blurb":"Sorts the results by..."},
        { "id": "44", "blurb":"I used ___, a ___ library, to..."},
        { "id": "46", "blurb":"Plug-in"},
        { "id": "47", "blurb":"Lorem ipsum"},
        { "id": "48", "blurb":"Bcrypt"},
        { "id": "49", "blurb":"Renders a template"}  
    ]} 

module.exports = {

    getOne: function(num){ 
        let board = {};
        if(num == "1"){
            board = board1
        } else if(num == "2"){
            board = board2
        } else if(num == "3"){
            board = board3
        } else {
            console.log("ERROR in getOne : ",num);
            return null;
        }
        let returnMe = new Board({
            "name": board.name,
            "board":[],
            "users":[],
            "over": false
        });
        let boardcopy = board.board.slice(0);
        // console.log(boardcopy);
        while(returnMe.board.length < 25){
            returnMe.board.push( 
                boardcopy.splice( Math.floor(Math.random()*boardcopy.length), 1 )[0] 
            ) //splice returns an Array, [0] get's the object out of the Array, since we are only pulling 1 positon.
        }
        returnMe.save(function(err){
            if(err){
                console.log("ERROR: ",returnMe.errors )
            } else {
                console.log("SAVED NEW BOARD - getOne");
            }
        })
        console.log("returning : returnMe");
        return returnMe;
    },

    getGameCardForUser: function(req, res){
        Board.findById(req.params.game_id, function(err, game){
            if(err){
                console.log("ERROR finding game by id :", err)
            } else {
                for( let x=0; x < game.users.length; x++){
                    if (game.users[x].user_id == req.params.user_id){
                        res.json({
                            board: game.users[x].card,
                            over: game.over,
                            winner: game.winner
                        })
                    }
                }
            }
        }) 
    },

    gameoverOneById: function(game_info, callback){
        Board.findById(game_info.game_id, function(err, game){
            if(err){
                console.log("YO DUDE. Bad game ID : ", err)
            } else {
                game.over = true;
                game.winner = game_info;
                game.save(function(err){
                    if(err){
                        console.log("GAMEOVER ERROR: ",game.errors )
                    } else {
                        console.log("SAVED GAMEOVER");
                        callback(game); 
                    }
                })
            // console.log("GAMEOVER GAME... :", game)
            }
        }) 
    }


}