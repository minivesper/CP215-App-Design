var sel_elem = document.getElementById('selector');
var table_elem = document.getElementById('table');
var contents_elem = document.getElementById('contents');

function readFile()
{
  console.log(sel_elem.files[ 0 ]);
  var reader = new FileReader();
  reader.onload = fileReadFinished;
  reader.readAsText(sel_elem.files[ 0 ]);
  //var contents = library.readFile(sel_elem.files[ 0 ]);
}

function fileReadFinished( evt )
{
  //console.log(evt.target);\
  var reader = evt.target;
  var content = reader.result;
  var lines = content.match( /^.*((\r\n|\n|\r)|$)/gm );
  var header_elem = document.createElement('tr');
  var head_elem = document.createElement('td');
  var head2_elem = document.createElement('td');
  var head3_elem = document.createElement('td');
  head_elem.innerHTML = "IP Address";
  head2_elem.innerHTML = "Timestamp";
  head3_elem.innerHTML = "javascript document?";
  table_elem.appendChild(header_elem);
  header_elem.appendChild(head_elem);
  header_elem.appendChild(head2_elem);
  header_elem.appendChild(head3_elem);
  var ip_pattern = /(\d{1,3}\.){3}\d{1,3}/g;
  var ts_pattern = /\[.*\]/g;
  var doc_pattern = /\.js/g;

  for( var i = 0; i < lines.length; i++)
  {
    var info_elem = document.createElement('tr');
    var ip_elem = document.createElement('td');
    var ts_elem = document.createElement('td');
    var doc_elem = document.createElement('td');
    table_elem.appendChild(info_elem);
    info_elem.appendChild(ip_elem);
    info_elem.appendChild(ts_elem);
    info_elem.appendChild(doc_elem);
    var ip = lines[i].match(ip_pattern);
    var ts = lines[i].match(ts_pattern);
    var doc =lines[i].search(doc_pattern);
    console.log(doc);
    ip_elem.innerHTML = ip;
    ts_elem.innerHTML = parse_ts(ts[0]);
    if(doc == -1)
    {
      doc_elem.innerHTML = "no"
    }
    else
    {
      doc_elem.innerHTML = "yes!"
    }
    //console.log( i, lines[i] );
    //console.log(ts[0]);
  }
}

function parse_ts(string)
{
  var day = string.charAt(1).concat(string.charAt(2));
  var month =  string.charAt(3).concat(string.charAt(4), string.charAt(5));
  var year = string.charAt(6).concat(string.charAt(7), string.charAt(8), string.charAt(9));
  if(string.charAt(10) == 0 )
  {
    var hour = string.charAt(11);
  }
  else
  {
     hour = string.charAt(10).concat(string.charAt(11));
  }
  var minute = string.charAt(12).concat(string.charAt(13));
  var second = string.charAt(14).concat(string.charAt(15));

  return month + " " + day + " " + year + " " + hour + ":" + minute + ":" + second;
}
