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
var socket ;
var l_socket ;
var all_peers = [] ;
var all_chats = {};
var sock_peer ={}; 
var curr_peer ={} ;
username = readlineSync.question('Enter your username : ');
port = parseInt(readlineSync.question("Enter the port you want use : " ) );   

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index1.html"); 

});

io.on('connection',function( client ){
 
    var address = client.handshake.address ; 
   var ipv4 =  new IPv4(address);           //extract ip address of peer
   ipv4 = ipv4.toString();
   
   flag = false ;
   client_name='';            //when set to true , then connection is with fellow peer

    client.on("init",function(data){

        if(data.data=="peer"){
            flag=true;
            client_name = data.name;
        }


        if(flag){                                   // if connection is a p2p connection rather than with our own webpage                            

    
            var peer = {};
            var local_flag = false;
            all_peers.forEach(element => {
        
                if(element.name ==   client_name){
                    peer = element;
                    local_flag = true; 
                }
            });
        
            if(local_flag==false){                   //if details about peer who requested connection is not there then to refresh
        
                loc_socket = ioc.connect("http://localhost:"+8000);
            
                my_details = {
                    'username':username,
                    'port': port
                }
                loc_socket.emit("my_name",my_details);
                loc_socket.on("peer_list",function(peer_list){
                    console.log("Refreshed peers sent by c server ");
                    all_peers = peer_list;
                    l_socket.emit("peer_list",peer_list); 
                    loc_socket.emit("disconnect");
                });     
        
                all_peers.forEach(element => {
        
                    if(element.name = client_name){
                        peer = element;
                       // local_flag = true;
                    }
                });
               
            }
        
            console.log("got a chat connection from "+peer.name + "  "+client.id );
            curr_peer.id = client.id;
            curr_peer.name = peer.name;
        
            sock_peer[peer.name] = client;  
            l_socket.emit("got_a_connection",peer);     // send to webpage about connection from a peer
            
        
        
            client.on("got_msg",function(message){
        
                console.log(" got a message from : "+message.sender + " "+message.chat);
                l_socket.emit("got_msg",message);
                if(all_chats[message.sender]!=undefined){     
                    all_chats[message.sender].push(message); 
                }
                else{
                    
                    all_chats[message.sender] = new Array(message);                              
        
                }
        
            });
             
        
        
        
        
        
        
        
        
           }  
        else{  
              
            l_socket = client;
        
        
            console.log("connected to locale !! "+l_socket.id);
            l_socket.on("get_peers",function(){ 
                
                  peer_function(client);         // gets peer list 
        
            
                
                
        
            });
        
            
            
        
            l_socket.on("discon",function(){
        
                socket = ioc.connect("http://localhost:"+8000);
                socket.emit("discon_1");
            });
        
            l_socket.on("connect_to_peer",function(peer_name){
        
                if(sock_peer[peer_name]!=undefined){
        
                    var peer = {};
        
                    all_peers.forEach(element => {
        
                        if(element.name = peer_name){
                            peer = element;
        
                        }
        
                    });
        
                    peer_object = {};
        
                    peer_object.peer = peer;
                    peer_object.all_chats = all_chats;
        
                    connected_to(l_socket,peer_object);
                    console.log(peer.name + " already connected "); 
        
        
        
                }else{
        
                console.log(peer_name);
                var peer = {}
                var flag = false;
                all_peers.forEach(element => { 
                    
                    if(element.name == peer_name){
                        peer = element;
                        flag = true;
                        
                    }
        
                });  
        
                if(flag == false){
                    l_socket.emit("no_peer_found");  
                } else{
        
                    console.log("connecting to : "+peer.ip+ " : "+peer.port );
                    socket_p = ioc.connect("http://"+peer.ip+":"+peer.port);
        
                    socket_p.on('connect_failed',function(){
        
                        l_socket.emit("no_peer_found"); 
                
                    });
        
                    socket_p.on("connect",function(){
        
                        init = {};
                        init.data = "peer";
                        init.name = username;
                        socket_p.emit("init",init);
        
        
        
                        peer_object = {};
                        peer_object.peer = peer;
                        peer_object.all_chats = all_chats ;
                        // l_socket.emit("connected_to",peer_object); 
                        connected_to(l_socket,peer_object);
                        sock_peer[peer.name] = socket_p ;  
                        console.log(peer.name + " successfully connected "); 
        
                        socket_p.on("got_msg",function(message){
                            
                            console.log(" got a message from : "+message.sender + " "+message.chat);
                                l_socket.emit("got_msg",message);
                                if(all_chats[message.sender]!=undefined){     
                                    all_chats[message.sender].push(message); 
                                }
                                else{
                                    
                                    all_chats[message.sender] = new Array(message);                              
        
                                }
        
        
                        });
        
        
        
        
        
        
        
                    });
        
        
        
        
        
                }
        
               } 
            });
        
        
        
            l_socket.on('send_msg',function(message){    
         
                if(all_chats[message.receiver]!=undefined){
                    all_chats[message.receiver].push(message);
                }
                else{
                    all_chats[message.receiver]= new Array(message);
                }
        
                console.log("sending message to : "+message.receiver + "  "+message.chat+ " "+sock_peer[message.receiver].id); 
                sock_peer[message.receiver].emit("got_msg",message);
                //console.log("")  
        
            });
        
        
        }
        
        


        

    });


   //    all_peers.forEach(element => {

//     if(element.ip==ipv4)
//     {
//        flag = true;                                        
//     }

//    });
   


});


function connected_to(l_socket,peer_object){

console.log(peer_object.peer.name);
l_socket.emit('connected_to',peer_object);




}




function peer_function(client){        //gets all peers from server

    console.log("peer func called !!");
    socket = ioc.connect("http://localhost:"+8000);
    
        my_details = {
            'username':username,
            'port': port
        }
        socket.emit("my_name",my_details);
        socket.on("peer_list",function(peer_list){
            console.log("All peers sent by c server ");
            all_peers = peer_list;
            client.emit("peer_list",peer_list); 
            socket.emit("disconnect");
        });    

}






http.listen(port,'0.0.0.0' ,function() {
    console.log(" client server of running on: http://localhost:"+port );     //what if port not available ?
    
});