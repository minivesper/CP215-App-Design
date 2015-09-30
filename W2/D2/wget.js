
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
     var line = contents_lines[i].split(" ");
     dests.push(line[0]);
     urls.push(line[1]);
     line.splice(0, 1);
     line.splice(0, 1);
 }

 function download(url, dest, callback)
 {

   console.log("start downloading!")
   var file = fs.createWriteStream( dest );

   var request = http.get(url, function(response){
     console.log("response??");
     response.pipe( file );
     file.on('finish', function(){
       console.log("finished writing");
     })
   });

   request.on( 'error', function( err ){
     console.log("Error!", err);
   });

   console.log("sent request");
 }
for (var i = 0; i < urls.length; i++) {
   download(urls[i], dests[i], null);
}

 console.log("done?");
