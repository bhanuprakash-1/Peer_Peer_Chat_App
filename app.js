var topology = require('fully-connected-topology');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var t = topology('127.0.0.1:8000',[])




t.on('connection',function(connection,peer){

    console.log("this is 8000: got a connection from " + peer);
    var socket_1 = t.peer('127.0.0.1:8001');
    message = "This is a message from 8000"
    socket_1.emit("func",message);
    
});

io.on("connection",function(){

    console.log("socket connection is established for 8000");

});
