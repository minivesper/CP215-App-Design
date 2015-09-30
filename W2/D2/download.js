var http = require( 'http' );
var fs = require( 'fs' );

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

download("htp://cs.coloradocollege.edu/index.html", "blah.blah", null);

console.log("done?");
