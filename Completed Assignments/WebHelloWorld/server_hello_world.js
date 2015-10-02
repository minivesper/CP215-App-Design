var http = require( 'http' );
var fs = require( 'fs' );

function server_fun( req, res )
{

  res.writeHead( 200 );
  var filename =  "." + req.url.toString();
  var fileBuffer = fs.readFileSync( filename );
  var contents = fileBuffer.toString();
  var contents_lines = contents.split('\n');
  for (var i = 0; i < contents_lines.length; i++) {
       res.write( contents_lines[i] );
     }

  res.end("\n\nFILE READ FINISHED");


}
var server = http.createServer( server_fun );

server.listen( 8080 );
