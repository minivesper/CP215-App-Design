var sql = require('sqlite3').verbose()

var db = new sql.Database('telluride.sqlite');

db.all('SELECT Performers.Name as PerfName, '+
' * FROM Performances '+
 'JOIN Performers ON Performers.ID = Performances.PID ' +
 'JOIN Stages ON Stages.ID = Performances.SID' +
 'WHERE Capacity < GroupSize', function(err, rows) {
  for (var i = 0; i < rows.length; i++)
  {
      console.log(rows[i].PerfName + " is too big for " + rows[i].Name);
  }
})
