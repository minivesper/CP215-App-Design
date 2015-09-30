
var fs = require('fs');
var http = require( 'http' );

if( process.argv.length < 3)
{
  console.log("Usage: Need a filename");
  process.exit( 1 );
}
var filename = process.argv[ 2 ];
console.log("You want me to read file: " + filename );
try{
  var fileBuffer = fs.readFileSync( filename );
}
catch( exp ) {
  console.log("Failed to read file: " + filename);
  process.exit( 2 );
}
  var urls = [];
  var dests = [];
  var contents = fileBuffer.toString();
  var contents_lines = contents.split('\n');
  for (var i = 0; i < contents_lines.length; i++) {
    if(contents_lines[i] !== "")
      {
        var line = contents_lines[i].split(" ");
        dests.push(line[0]);
        urls.push(line[1]);
        line.splice(0, 1);
        line.splice(0, 1);
      }

   }

 function download(url, dest, callback, line)
 {

  // console.log("start downloading!");
   try{
     var f = fs.openSync(dest, "w");
     fs.closeSync(f);
    }
    catch( exp )
    {
      console.log("ERROR! could not open file", dest);
      return;
    }
   var file = fs.createWriteStream( dest );
   try
   {
     var request = http.get(url, function(response){
    //  console.log("response??");
      response.pipe( file );
      file.on('finish', function(){
        console.log("successfuly wrote", dest);
      });
    });

    request.on( 'error', function( err ){
      if( err.code == "ENOTFOUND")
      {
        console.log( "ERROR! invalid address on line", line + 1);
        return;
      }
      else
      {
        console.log("Error!", err);
      }
    });

    }
    catch( exp )
    {
      console.log("ERROR!", url, " is not an address");
      return;
    }
   //console.log("sent request");
 }
for (var i = 0; i < urls.length; i++) {
   download(urls[i], dests[i], null, i);
}

 //console.log("done?");
