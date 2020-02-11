const app = require('express')(); 
const http = require('http').Server(app); 
const io = require('socket.io')(http); 
const bodyParser = require('body-parser'); 
var ioc = require('socket.io-client'); 
var readlineSync = require('readline-sync');

var port ;
var username ;
all_peers = [];

 username = readlineSync.question('Enter your username : ');
 port = parseInt(readlineSync.question("Enter the port you want use : " ) );   


app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('home.ejs', {username : username , port : port , all_peers: all_peers }); 
 });

//all_clients = [] 


app.get('/userlist',function(req,res){      //when get userlist is asked this method gets executed

    var client = ioc.connect("http://localhost:"+8000);
    client.once("connect",function(){
         
        var my_details = {
            "username":username,              // for sending my name and port details
            "port": port
        }
        client.emit("my_name", my_details);    // sending the central server my details once got connected 
        
        


    });

    client.on("peers_list", function(peers_list){
        all_peers = peers_list ;
        console.log(" all peers sent by c server : "); 
        all_peers.forEach(element => {
            if(element.name!= username)
            console.log(element.name + "  and his ip is : " + element.ip + " and his port is : "+ element.port);
        });  

        client.emit("disconnect");
    });

    

    res.redirect('/');

});



app.post('/connect_to',function(req,res){
    
    console.log(req.body);
    var client = ioc.connect("http://localhost:"+req.body.port_no);
    client.once("connect",function(){
        var user_list 
        all_clients.push(client.id);
        console.log(" Executed ! ");
        client.emit("list_of_users");
        client.on("list_of_users",function(data){
             user_list = data;
            console.log(" data forech :  "+ data )
            res.render('list.ejs',{user_list:user_list}); 
            

        });


    });

    


}) ;

app.get("/userlist",function(req,res){

    res.send(all_clients);

});

io.on('connection',function(client){

        console.log("A new client connected: " + client.id );      

});






 http.listen(port,'0.0.0.0' ,function() {
    console.log(" click on this url for home page : http://localhost:"+port );     //what if port not available ?
    
 });