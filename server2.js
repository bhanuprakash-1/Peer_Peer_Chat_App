const app = require('express')(); 
const http = require('http').Server(app); 
const io = require('socket.io')(http); 
const bodyParser = require('body-parser'); 
var ioc = require('socket.io-client'); 
var readlineSync = require('readline-sync');
const IPv4 = require("ip-num").IPv4;



app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');


var port ;
var username ;
all_peers = [];
curr_peers = {};
all_chats = {};

username = readlineSync.question('Enter your username : ');
port = parseInt(readlineSync.question("Enter the port you want use : " ) );   

async while(1){

 input = readlineSync.question('>>');

if(input="bye"){
    console.log("Good bye");
    break;
}
else{
    console.log("please enter somehting: ");
}



}








// app.get('/', function(req, res) {
//     res.render('home.ejs', {username : username , port : port , all_peers: all_peers }); 
//  });




// app.get('/userlist',function(req,res){      //when get userlist is asked this method gets executed

//     var client = ioc.connect("http://localhost:"+8000);
//     client.once("connect",function(){
         
//         var my_details = {
//             "username":username,              // for sending my name and port details
//             "port": port
//         }
//         client.emit("my_name", my_details);    // sending the central server my details once got connected 
        
        


//     });

//     client.on("peers_list", function(peers_list){
//         all_peers = peers_list ;
//         console.log(" all peers sent by c server : "); 
//         // all_peers.forEach(element => {
//         //     if(element.name!= username)
//         //     console.log(element.name + "  and his ip is : " + element.ip + " and his port is : "+ element.port);
//         // });  

//         client.emit("disconnect");
//     });

    

//     res.redirect('/');

// });



// app.post('/connect_to',function(req,res){
    
//     var name_of_peer = toString(req.body.name );
//     var peer = {} 
//     var flag = false;
//     all_peers.forEach(element => {
        
//         if(name_of_peer==element.name)
//         {
//             peer = element ;
//             flag = true;
//         }

//     });    
    
//     console.log(" Connecting to chat with : " + peer.name );

//     let peer_ip = new IPv4(peer.ip); 

//     var client = ioc.connect("http://"+peer_ip+":"+peer.port );

    
    
//     client.once("connect",function(peer_socket){

//         curr_peers['peer.name']=peer_socket;
//         res.render("chat.ejs",{ peer_name:peer.name, my_name:username , all_chats:all_chats[peer.name] }); 

//     });


//   res.redirect("/") 
    
// });





// app.get("/userlist",function(req,res){

//     res.send(all_clients);          

// });



// io.on('connection',function(client){

//         console.log("A new client connected: " + client.id );      

// });






 http.listen(port,'0.0.0.0' ,function() {
    console.log(" click on this url for home page : http://localhost:"+port );     //what if port not available ?
    
});