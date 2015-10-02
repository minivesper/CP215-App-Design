var fs = require( 'fs' );
var http = require( 'http' );
//var user_elem = document.getElementById("user");
//var pass_elem = document.getElementById("pass");

function getFormValuesFromURL( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    var key_value_pairs = parts[1].split( "&" );
    for( var i = 0; i < key_value_pairs.length; i++ )
    {
        var key_value = key_value_pairs[i].split( "=" );
        kvs[ key_value[0] ] = key_value[1];
    }
    console.log( kvs );
    return kvs
}

function server_fun( req, res )
{
    console.log( req.url );
    // ...
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        // console.log( "huh?", req.url.indexOf( "second_form?" ) );
        if( req.url.indexOf( "user_form?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            fs.appendFileSync("Users.txt", "Username: " + kvs.username + "\n");
            fs.appendFileSync("Users.txt", "Password: " + kvs.password + "\n");
            //fs.writeFileSync("users.txt", "password: " + pass + "\n");
            res.writeHead( 200 );
            res.end( "Account Created");
        }
        else
        {
            // console.log( exp );
            res.writeHead( 404 );
            res.end( "Could not create account" );
        }
    }
}

//not fully complete
/*function authorize()
{
  var fileBuffer = fs.readFileSync( "Users.txt" );
  var contents = fileBuffer.toString();
   var contents_lines = contents.split('\n');
   for (var i = 0; i < contents_lines.length; i++) {
     if(contents_lines[i] == "Username: " + user_elem.value)
     {
       if(contents_line[i + 1] == "Password: " + pass_elem.value)
       {
          alert(Successfully logged on);
        }Object.keys(kvs);
      }
      else {
        alert(incorrect username or password);
      }
   }
}*/

var server = http.createServer( server_fun );

server.listen( 8080 );
