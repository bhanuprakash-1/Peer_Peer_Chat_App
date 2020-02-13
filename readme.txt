This has a napster like architecture. Where initially every peer has to say to central server that it is available 
and in the same step centrel server gives list of other available peers. So we should periodically get new peers who
have joined the p2p network.

The connection is by p2p using socket programming ( socket io of javascript ).
Here every client is a webpage and its local server together.
Central server has a static ip to which all peers can connect and get information.

Connecting to other peers is by webpage which is interactive and asynchronous.