var fs = require( 'fs' );
var http = require( 'http' );

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
    // console.log( kvs );
    return kvs
}

function parseTime( time )
{
  var time_value = 0;
  var char_pattern = /[0-9A-Za-z]{1,2}/g;
  var time_parts = time.match(char_pattern);
  var a = parseInt(time_parts[0]);
  var b = parseInt(time_parts[1]);
  time_value = (a*100) + b;
  if(time_parts[2] == "PM" && a != 12)
  {
    time_value = time_value + 1200;
  }
  if(time_parts[2] == "AM" && a == 12)
  {
    time_value = time_value + 1200;
  }
  return time_value;
}

function server_fun( req, res )
{
    var sql = require( 'sqlite3' ).verbose();
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
        if( req.url.indexOf( "Add_Weather_Event?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            var db = new sql.Database( 'weather.sqlite' );
            var values = "('";
            values += kvs['TimeMDT'] + "','";
            values += kvs['TemperatureF'] + "','";
            values += kvs['Dew_pointF'] + "','";
            values += kvs['Humidity'] + "','";
            values += kvs['Sea_level_PressureIn'] + "','";
            values += kvs['VisibilityMPH'] + "','";
            values += kvs['Wind_Direction'] + "','";
            values += kvs['Wind_Speed_mph'] + "','";
            values += kvs['Gust_SpeedMPH'] + "','";
            values += kvs['PrecipitationIN'] + "','";
            values += kvs['Events'] + "','";
            values += kvs['Conditions'] + "','";
            values += kvs['Wind_dir_degrees'] + "','";
            values += kvs['DateUTC'] + "')";
            var sql = "INSERT INTO weather (TimeMDT, TemperatureF, DewPointF, Humidity, SealevelPressure, "
            sql +=     "VisibilityMPH, WindDirection, WindSpeedMPH, GustSpeed, Precipitationin, "
            sql += "Events, Conditions, WindDirDegrees, DateUTC) VALUES "
            db.run( sql + values,
                        function( err ) {
                            //console.log(err);
                            console.log("added weather event");
                        } );
        }
        else if( req.url.indexOf( "first_form?" ) >= 0 )
        {
            var db = new sql.Database( 'weather.sqlite' );
            var kvs = getFormValuesFromURL( req.url );
            var min_time = kvs['min_time'];
            var max_time = kvs['max_time'];
            db.all( "SELECT * FROM weather",
                function( err, rows ) {
                    res.writeHead( 200 );
                    var resp_text = "";
                    for( var i = 1; i < rows.length; i++ )
                    {
                        console.log(parseTime(max_time));
                        console.log(parseTime(min_time));
                        console.log(parseTime(rows[i].TimeMDT));
                        if(parseTime(max_time) >= parseTime(rows[i].TimeMDT) && parseTime(rows[i].TimeMDT) >= parseTime(min_time))
                        {
                        console.log("yes");
                        resp_text += rows[i].TimeMDT +" "+ rows[i].TemperatureF +" "+ rows[i].DewPointF +" "+ rows[i].Humidity +" "+
                        rows[i].SealevelPressure +" "+ rows[i].VisibilityMPH +" "+ rows[i].WindDirection +" "+ rows[i].WindSpeedMPH +" "+
                        rows[i].GustSpeed +" "+ rows[i].Precipitationin +" "+ rows[i].Events +" "+ rows[i].Conditions +" "+
                        rows[i].WindDirDegrees +" "+ rows[i].DateUTC +"\n";
                        }

                    }
                    res.end( resp_text );
                } );
        }
        else
        {
            // console.log( exp );
            res.writeHead( 404 );
            res.end( "Cannot find file: "+filename );
        }
    }
}
var server = http.createServer( server_fun );

server.listen( 8080 );
