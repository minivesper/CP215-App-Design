var http = require( 'http' );

function server( req, res)
{
  console.log(req);
  res.writeHead( 200 );
  res.end( "Hello world" );
}

var server = http.createServer(server);

server.listen(8080);
