var fs = require( 'fs' );

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

function write()
{
  var sql = require( 'sqlite3' ).verbose();
  var db = new sql.Database( 'weather.sqlite' );
  var contents = fileBuffer.toString();
  var contents_lines = contents.split('\n');
  for (var i = 1; i < contents_lines.length; i++) {
    if(contents_lines[i] !== "")
      {
        var line = [];
        line = contents_lines[i].split(",");
        var values = "('";
        values += line[0] + "','";
        values += line[1] + "','";
        values += line[2] + "','";
        values += line[3] + "','";
        values += line[4] + "','";
        values += line[5] + "','";
        values += line[6] + "','";
        values += line[7] + "','";
        values += line[8] + "','";
        values += line[9] + "','";
        values += line[10] + "','";
        values += line[11] + "','";
        values += line[12] + "','";
        values += line[13] + "')";
        //console.log(sql + values);
        var sql = "INSERT INTO weather (TimeMDT, TemperatureF, DewPointF, Humidity, SealevelPressure, "
        sql +=     "VisibilityMPH, WindDirection, WindSpeedMPH, GustSpeed, Precipitationin, "
        sql += "Events, Conditions, WindDirDegrees, DateUTC) VALUES "
        db.run( sql + values,
                    function( err ) {
                        //console.log(err);
                        console.log("added weather event");
                    } );
      }

   }
}
write();
