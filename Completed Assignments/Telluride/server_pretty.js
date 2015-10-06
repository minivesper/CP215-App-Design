var fs = require( 'fs' );
var http = require( 'http' );
var sql = require( 'sqlite3' ).verbose();

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
    return kvs
}

function parseTime1( time )
{
  var char_pattern = /[0-9A-Za-z]{1,2}/g;
  var time_parts = time.match(char_pattern);
  var a = parseInt(time_parts[0]);
  var b = parseInt(time_parts[1]);
  console.log(a);
  console.log(b);
  time_value = (a*100) + b;
  if(time_parts[2] == "AM")
  {
    time_value = time_value - 1200;
  }
  return time_value;
}

function parseTime2( time )
{
  var char_pattern = /[0-9A-Za-z]{1,2}/g;
  var time_parts = time.match(char_pattern);
  var a = parseInt(time_parts[0]);
  var b = parseInt(time_parts[1]);
  console.log(a);
  console.log(b);
  time_value = 1200 + (a*100) + b;
  return time_value;
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
        if( req.url.indexOf( "get_performer_info?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            var db = new sql.Database( 'telluride.sqlite' );
            console.log( kvs['perf_id'] );
            db.all( "SELECT * FROM Performers WHERE Name = ?",
                    kvs['perf_id'],
            // db.all( "SELECT * FROM Performers",
                    function( err, rows ) {
                        if( err )
                        {
                            res.writeHead( 200 );
                            res.end( "ERROR: " + err );
                        }
                        else
                        {
                            res.writeHead( 200 );
                            var response_text = "<html><body>"+rows.length+"<table><tbody>";
                            for( var i = 0; i < rows.length; i++ )
                            {
                                response_text += "<tr><td>" + rows[i].Name +
                                    "</td><td>"+rows[i].GroupSize+"</td></tr>";
                            }
                            response_text += "</tbody></table></body></html>";
                            res.end( response_text );
                        }
                    } );
        }
        else if (req.url.indexOf( "get_perf_after_time?" ) >= 0 )
        {
          var kvs = getFormValuesFromURL( req.url );
          var db = new sql.Database( 'telluride.sqlite' );
          db.all( 'SELECT Performers.Name as PerfName, * '+
          'FROM Performances '+
            'JOIN Performers ON Performers.ID = Performances.PID '+
            'JOIN Stages ON Stages.ID = Performances.SID',
          // db.all( "SELECT * FROM Performers",
                  function( err, rows ) {
                      if( err )
                      {
                          res.writeHead( 200 );
                          res.end( "ERROR: " + err );
                      }
                      else
                      {
                          res.writeHead( 200 );
                          var response_text = "<html><body>" + "<table><tbody>";
                          for( var i = 0; i < rows.length; i++ )
                          {
                              console.log(parseTime1(kvs['perf_time']));
                              console.log(parseTime2(rows[i].Time));
                              if(parseTime1(kvs['perf_time']) <= parseTime2(rows[i].Time))
                              {
                              response_text += "<tr><td>" + rows[i].PerfName +
                                  "</td><td>" + rows[i].Name + "</td><td> " + rows[i].Time + "</td></tr>";
                                }
                          }
                          response_text += "</tbody></table></body></html>";
                          res.end( response_text );
                      }
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
