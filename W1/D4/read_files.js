var sel_elem = document.getElementById('selector');
var content_elem = document.getElementById('contents')

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
  console.log (reader.result);
  content_elem.appendChild( document.createTextNode(reader.result) );
}
