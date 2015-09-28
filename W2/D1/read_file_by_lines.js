
var fs = require('fs');

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
var contents = fileBuffer.toString();
 var contents_lines = contents.split('\n');
 for (var i = 0; i < contents_lines.length; i++) {
   console.log(contents_lines[i]);
 }
