var list_elem = document.getElementById("url_list");
var new_elem = document.getElementById("new_item_text")
var position_elem = document.getElementById("list_position")

var js_obj1 = { name: "Google"  };
var js_obj2 = { name: "Reddit"  };
var js_obj3 = { name: "Bing"  };
var items = [js_obj1, js_obj2, js_obj3 ];

function acceptItem()
{

}

function deleteItem( evt )
{

  items.splice((evt.target.array_index - 1), 1);
  renderList();
}

function editItem( evt )
{


  row_elem.removeChild(btn2_elem)
  row_elem.appendChild(url_elem);
}


function renderList()
{
while(list_elem.firstChild != null)
  {
   list_elem.removeChild( list_elem.firstChild);
 }
    for (var i = 0; i < items.length; i++)
    {
      var row_elem = document.createElement( 'tr' );
      var item_elem = document.createElement('td');
      var btn3_elem = document.createElement('input');
      var btn2_elem = document.createElement('input');
      var btn_elem = document.createElement('input');
      var url_elem = document.createElement('input');

      url_elem.value = "enter url";

      btn2_elem.value = "accept";
      btn2_elem.type = "button";
      btn2_elem.onclick = acceptItem;


      btn2_elem.value = "edit";
      btn2_elem.type = "button";
      btn2_elem.onclick = editItem;

      btn_elem.value = "delete";
      btn_elem.type = "button";
      btn_elem.array_index = i;
      btn_elem.onclick = deleteItem;

      item_elem.style.fontSize= ((1/items[i].priority)) * 400;
      item_elem.innerHTML = items[i].name;

      list_elem.appendChild( row_elem );
      row_elem.appendChild(item_elem);
      row_elem.appendChild(btn2_elem);
      row_elem.appendChild(btn_elem);
      //console.log(items[i]);
    }
}
function addItem()
{
  var new_obj = {name: new_elem.value };
  items.push(new_obj);
  renderList();
}
renderList();
