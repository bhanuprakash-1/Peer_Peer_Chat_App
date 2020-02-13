This has a napster like architecture. Where initially every peer has to say to central server that it is available 
and in the same step centrel server gives list of other available peers. So we should periodically get new peers who
have joined the p2p network.

The connection is by p2p using socket programming ( socket io of javascript ).
Here every client is a webpage and its local server together.
Central server has a static ip to which all peers can connect and get information.

Connecting to other peers is by webpage which is interactive and asynchronous.


Only useful files are server.js , client.js and index1.html.

Server.js has code for central server ,

client.js and index1.html are part of client code.

How to run: 

Step1: Run server.js 
Step2: Run client.js and give prompted inputs.
Step3: Click on the link printed in terminal.

For every client ,repeat step2 and step3.

Now the interface is the browser for all clients.

The architecture is : A central server which has fixed address

Clients: Which get details about fellow peers from central server with a socket.
Then , they will communicate between themselves.
