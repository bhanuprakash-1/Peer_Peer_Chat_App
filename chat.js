
var locale ;
var username;
var port;

$(document).ready(function(){

    alert("okay");
    ask_port();

});


function ask_port(){

   username = parseInt(prompt("Enter the  name : "," your name"));
   port = parseInt(prompt("Enter the  port number : ",8080));
  if(port<1000 || port > 64000)
  {
      alert("port not in range !!");
      location.reload();
  }
  else{
      locale = io('http://localhost:'+port);
      alert("Conected to local host !!!");
  }

}


function discon(){

    locale.emit("discon");
    alert("disconnected from p2p network !! ");


}

function connect_to_peer(){

    var peer_name = document.getElementById("form_id").value;
    alert(" Form value is : "+ peer_name);     // development
    locale.emit("connect_to_peer",peer_name);    

}

locale.on("no_peer_found",function(){

alert(" No peer with that name, refresh peer list , enter again !!");

});

locale.on("connected_to",function(peer){

    alert("connected to : "+ peer.peer.name);
     all_chats = peer.all_chats;

     $('#chats').html('');
     all_chats.forEach(element => {
        
        
        $('#chats').append('<li><strong>'+element.sender+ ' : </strong>' + element.chat + ' </li>' );
        

     });
    


});




function get_peers(){

    alert("connected to p2p netwrok !! ");
    locale.emit("get_peers");
    locale.on("peer_list",function(list_peers){

        peer_list = '';

        list_peers.forEach(element => {

            if(element.name != username)
            peer_list+= '<li> '+ element.name + '    ' + element.ip + '    ' + element.port +'</li>';
        });
        document.getElementById("list_of_peers").innerHTML = peer_list ;

    });
    


}