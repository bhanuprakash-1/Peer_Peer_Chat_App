var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const ipaddr = require('ipaddr.js');
const IPv4 = require("ip-num").IPv4;

var all_peers = []  

// app.get('/', function(req, res) {
//    res.sendfile('index.html');       
// });

io.on('connection', function(socket) {

   var address = socket.handshake.address ; 
   let ipv4 = new IPv4(address);        //extract ip address of peer
   console.log('A peer connected :  '+ ipv4);   
   var peer = {} 
   //peer.id = socket.id;
   
  // ipv4.toBinaryString();
   peer.ip = ipv4;
   
   
   //socket.emit("your_name");
      
   socket.on("my_name",function(data){

      socket.emit('peers_list',all_peers);
      peer.name = data.username;
      peer.port = data.port;
      console.log("received peer name : "  + peer.name + "  " + peer.port);
      
      var flag = true;

      for(var i=0 ; i<all_peers.length ; i++)
      {
         if(all_peers[i].name == peer.name)
         flag = false;
      }
     
      if(flag){
          all_peers.push(peer);
      }
        //sending client the list of all peers 

      // socket.emit("list_of_users",all_sockets)
      // console.log("This is list of users till now ");
      // all_sockets.forEach(element => {    
         
      //    console.log(element);
      // });

   });

   // socket.on('peers_list',function(){

   //    socket.emit('peers_list',all_peers); 

   // });
   
   //Send a message when 
   // setTimeout(function() {
   //    //Sending an object when emmiting an event
   //    socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
   // }, 4000);


   socket.on("discon_1",function(){

         const index= all_peers.indexOf(peer);
         if(index > -1){
            all_peers.splice(index ,1)                            //removing a peer from the all_peers array on disconnection.
         }

         console.log('A peer disconnected  and entry removed : '+peer.name  ); 
         socket.disconnect(true);
         
   });

   socket.on('disconnect', function () {

      console.log(" a peer disconn : " + peer.name); 
      //all_sockets.delete(socket.id)

   });
});


http.listen(8000,'0.0.0.0' ,function() {
   console.log('Central Server is running on localhost:8000');
});