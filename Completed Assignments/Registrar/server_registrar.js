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

function addStudent( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var name = kvs[ 'name' ];
    var sandwich = kvs[ 'sandwich' ];
    db.run( "INSERT INTO Students(Name, SandwichPreference) VALUES ( ?, ? )", name, sandwich,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added student" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addTeacher( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var name = kvs[ 'name' ];
    db.run( "INSERT INTO Teachers(Name) VALUES ( ? )", name,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added Teacher" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
    }

function addCourse( req, res )
    {
        var kvs = getFormValuesFromURL( req.url );
        var db = new sql.Database( 'registrar.sqlite' );
        var name = kvs[ 'name' ];
        db.run( "INSERT INTO Courses(Name) VALUES ( ? )", name,
                function( err ) {
                    if( err === null )
                    {
                        res.writeHead( 200 );
                        res.end( "Added Course" );
                    }
                    else
                    {
                        console.log( err );
                        res.writeHead( 200 );
                        res.end( "FAILED" );
                    }
                } );

        }

  function buildEnroll(req, res)
  {
    var db = new sql.Database( 'registrar.sqlite' );
    db.all( "SELECT * FROM Students",
            function( err, stu_rows ) {
                if( err === null )
                {
    db.all( "SELECT * FROM Courses",
              function( err, class_rows ) {
                    if( err === null )
                    {
      var page = "";
      page += "<html>" +
                    "<body>" +
                        "<form action='sub_enroll'method='get'>" +
                        "<select name='studentID'>";
                          for (var i = 0; i < stu_rows.length; i++) {
                            page += "<option value=" + stu_rows[i].sid +  ">" + stu_rows[i].Name + "</option>";
                          }
                          page += "</select>" +
                          "<select name='ClassID'>";
                          for (var i = 0; i < class_rows.length; i++) {
                            page += "<option value=" + class_rows[i].cid +  ">" + class_rows[i].Name + "</option>";
                          }
                          page += "</select>" +
                          "<input type='submit'></input>" +
                        "</form>" +
                      "</body>" +
                    "</html>";
                    res.writeHead( 200 );
                    res.end( page );
                  }
                  else
                  {
                  console.log( err );
                  res.writeHead( 200 );
                  res.end( "FAILED" );
                  }
          } );
        }
        else
        {
          console.log( err );
          res.writeHead( 200 );
          res.end( "FAILED" );
        }
      } );
  }

  function buildAssign(req, res)
  {
    var db = new sql.Database( 'registrar.sqlite' );
    db.all( "SELECT * FROM Teachers",
            function( err, tea_rows ) {
                if( err === null )
                {
    db.all( "SELECT * FROM Courses",
              function( err, class_rows ) {
                    if( err === null )
                    {
      var page = "";
      page += "<html>" +
                    "<body>" +
                        "<form action='sub_assign'method='get'>" +
                        "<select name='teacherID'>";
                          for (var i = 0; i < tea_rows.length; i++) {
                            page += "<option value=" + tea_rows[i].tid +  ">" + tea_rows[i].Name + "</option>";
                          }
                          page += "</select>" +
                          "<select name='ClassID'>";
                          for (var i = 0; i < class_rows.length; i++) {
                            page += "<option value=" + class_rows[i].cid +  ">" + class_rows[i].Name + "</option>";
                          }
                          page += "</select>" +
                          "<input type='submit'></input>" +
                        "</form>" +
                      "</body>" +
                    "</html>";
                    res.writeHead( 200 );
                    res.end( page );
                  }
                  else
                  {
                  console.log( err );
                  res.writeHead( 200 );
                  res.end( "FAILED" );
                  }
          } );
        }
        else
        {
          console.log( err );
          res.writeHead( 200 );
          res.end( "FAILED" );
        }
      } );
  }

  function subEnroll( req, res )
      {
          var kvs = getFormValuesFromURL( req.url );
          var db = new sql.Database( 'registrar.sqlite' );
          var sid = kvs[ 'studentID' ];
          var cid = kvs[ 'ClassID' ];
          console.log(sid);
          console.log(cid);
          db.run( "INSERT INTO Enrollments(student, class) VALUES ( ?, ? )", sid, cid,
                  function( err ) {
                      if( err === null )
                      {
                          res.writeHead( 200 );
                          res.end( "Added enrollment" );
                      }
                      else
                      {
                          console.log( err );
                          res.writeHead( 200 );
                          res.end( "FAILED" );
                      }
                  } );

          }

  function subAssign( req, res )
    {
        var kvs = getFormValuesFromURL( req.url );
        var db = new sql.Database( 'registrar.sqlite' );
        var tid = kvs[ 'teacherID' ];
        var cid = kvs[ 'ClassID' ];
        console.log(tid);
        console.log(cid);
        db.run( "INSERT INTO TeachingAssignments(teacher, class) VALUES ( ?, ? )", tid, cid,
                    function( err ) {
                              if( err === null )
                              {
                                  res.writeHead( 200 );
                                  res.end( "Added assignment" );
                              }
                              else
                              {
                                  console.log( err );
                                  res.writeHead( 200 );
                                  res.end( "FAILED" );
                              }
                          } );

                  }
function viewStudent( req, res )
{
                  var db = new sql.Database( 'registrar.sqlite' );
                  db.all("SELECT * FROM Students",
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
                              response_text += "<tr><td>" + rows[i].Name +
                              "</td><td>" + rows[i].sid + "</td><td> " + rows[i].SandwichPreference + "</td></tr>";

                          }
                          response_text += "</tbody></table></body></html>";
                          res.end( response_text );
                        }
                  } );
                }
    function viewTeacher( req, res )
        {
                    var db = new sql.Database( 'registrar.sqlite' );
                    db.all("SELECT * FROM Teachers",
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
                                          response_text += "<tr><td>" + rows[i].Name +
                                          "</td><td>" + rows[i].tid + "</td></tr>";

                                        }
                                        response_text += "</tbody></table></body></html>";
                                        res.end( response_text );
                                      }
                              } );
                            }
      function viewCourse( req, res )
                      {
                          var db = new sql.Database( 'registrar.sqlite' );
                          db.all("SELECT * FROM Courses",
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
                                                    response_text += "<tr><td>" + rows[i].Name +
                                                    "</td><td>" + rows[i].cid + "</td></tr>";

                                                          }
                                                          response_text += "</tbody></table></body></html>";
                                                          res.end( response_text );
                                                            }
                                              } );
                                    }

  function viewEnroll( req, res )
      {
  var db = new sql.Database( 'registrar.sqlite' );
  db.all("SELECT * FROM Enrollments",
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
              response_text += "<tr><td>" + rows[i].student +
              "</td><td>" + rows[i].class + "</td></tr>";

                }
                response_text += "</tbody></table></body></html>";
                res.end( response_text );
                }
            } );
      }

      function viewtassign( req, res )
          {
      var db = new sql.Database( 'registrar.sqlite' );
      db.all("SELECT * FROM TeachingAssignments",
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
                  response_text += "<tr><td>" + rows[i].teacher +
                  "</td><td>" + rows[i].class + "</td></tr>";

                    }
                    response_text += "</tbody></table></body></html>";
                    res.end( response_text );
                    }
                } );
          }

function server_fun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    // ...
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        if( req.url.indexOf( "add_student?" ) >= 0 )
        {
            addStudent( req, res );
        }
        else if( req.url.indexOf( "add_teacher?" ) >= 0 )
        {
            addTeacher( req, res );
        }
        else if( req.url.indexOf( "add_course?" ) >= 0 )
        {var sid = kvs[ 'student_ID' ];
            addCourse( req, res );
        }
        else if( req.url.indexOf( "add_enrollment" ) >= 0 )
        {
            buildEnroll( req, res );
        }
        else if( req.url.indexOf( "add_tassign" ) >= 0 )
        {
            buildAssign( req, res );
        }
        else if( req.url.indexOf( "sub_enroll" ) >= 0 )
        {
            subEnroll( req, res );
        }
        else if( req.url.indexOf( "sub_assign" ) >= 0 )
        {
            subAssign( req, res );
        }
        else if( req.url.indexOf( "view_student" ) >= 0 )
        {
            viewStudent( req, res );
        }
        else if( req.url.indexOf( "view_teacher" ) >= 0 )
        {
            viewTeacher( req, res );
        }
        else if( req.url.indexOf( "view_course" ) >= 0 )
        {
            viewCourse( req, res );
        }
        else if( req.url.indexOf( "view_enrollment" ) >= 0 )
        {
            viewEnroll( req, res );
        }
        else if( req.url.indexOf( "view_tassign" ) >= 0 )
        {
            viewtassign( req, res );
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
