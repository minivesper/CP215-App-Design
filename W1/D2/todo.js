var list_elem = document.getElementById("the_list");
var new_elem = document.getElementById("new_item_text")
var priority_elem = document.getElementById("priority_input")
var position_elem = document.getElementById("list_position")

var js_obj1 = { priority: 12, name: "shop"  };
var js_obj2 = { priority: 14, name: "clean"  };
var js_obj3 = { priority: 20, name: "Do Homework"  };

var items = [js_obj1, js_obj2, js_obj3 ];

function compareToDoItems(item1, item2)
{
  return item1.priority - item2.priority;
}

function deleteItem()
{
  var lpos = position_elem.value;
  console.log(lpos);
  var index = parseInt(lpos);
  if(isNaN(index)||index > (items.length)||(index < 1) )
  {
    alert("Please enter a number between 1 and " + items.length);
    return;
  }
  items.splice((index - 1), 1);
  renderList();
}

function renderList()
{
  items.sort(compareToDoItems);
while(list_elem.firstChild != null)
  {
   list_elem.removeChild( list_elem.firstChild);
 }
    for (var i = 0; i < items.length; i++)
    {
      var item_elem = document.createElement( 'li' );
      //make the content of item_elem items[i]
      item_elem.style.fontSize= ((1/items[i].priority)) * 400;
      item_elem.innerHTML = items[i].name + "(" + items[i].priority + ")";
      list_elem.appendChild( item_elem );
      //console.log(items[i]);
    }
}
function addItem()
{
  var new_obj = {priority: priority_elem.value, name: new_elem.value };
  items.push(new_obj);
  renderList();
}
function priorityChange()
{
  console.log(priority_elem.value);
}
renderList();
