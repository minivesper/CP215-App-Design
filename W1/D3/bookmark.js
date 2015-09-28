var list_elem = document.getElementById("url_list");
var new_elem2 = document.getElementById("new_item_text");
var new_elem = document.getElementById("new_item_href");
var position_elem = document.getElementById("list_position");

var js_obj1 = { name: "Google", href: "https://www.google.com/", index: "1" };
var js_obj2 = { name: "Reddit", href: "https://www.reddit.com/",  index: "2" };
var js_obj3 = { name: "Wikipedia", href: "https://www.wikipedia.org/",  index: "1" };
var urls = [js_obj1, js_obj2, js_obj3 ];



function deleteItem( evt )
{

  urls.splice((evt.target.array_index), 1);
  renderList();
}


function renderList()
{
while(list_elem.firstChild !== null)
  {
   list_elem.removeChild( list_elem.firstChild);
 }
    for (var i = 0; i < urls.length; i++)
    {
      var row_elem = document.createElement( 'tr' );
      var item_elem = document.createElement('td');
    // var btn3_elem = document.createElement('input');
      var btn2_elem = document.createElement('input');
      var btn_elem = document.createElement('input');
      var url_elem = document.createElement('input');
      var name_elem = document.createElement('input');
      var link_elem = document.createElement('a');

      url_elem.value = "enter url";

      name_elem.value = "enter name";

      /*btn3_elem.value = "accept";
      btn3_elem.type = "button";
      btn3_elem.onclick = acceptItem;
      btn3_elem.array_index = i;*/

      btn2_elem.value = "edit";
      btn2_elem.type = "button";
      btn2_elem.array_index = i;
      btn2_elem.onclick = editItem;

      btn_elem.value = "delete";
      btn_elem.type = "button";
      btn_elem.array_index = i;
      btn_elem.onclick = deleteItem;

      link_elem.href= urls[i].href;
      link_elem.innerHTML = urls[i].name;
      link_elem.id = 'p1';

      list_elem.appendChild( row_elem );
      row_elem.appendChild(item_elem);
      item_elem.appendChild(link_elem);
      row_elem.appendChild(btn2_elem);
      row_elem.appendChild(btn_elem);

      var rows = [];
      rows.push(row_elem);
      //console.log([i]);
    }
    function editItem( evt )
      {
        deleteItem( evt );
        addItem();
        /*row_elem.removeChild(btn2_elem);
        row_elem.removeChild(btn_elem);
        item_elem.removeChild(link_elem);
        list_elem.appendChild(row_elem);
        item_elem.appendChild(name_elem);
        item_elem.appendChild(url_elem);
        row_elem.appendChild(btn3_elem);
        tried to accomplisha more complex edit function,but it kept giving me trouble
        instead combined the delete and add function. */
      }
      /*function acceptItem(evt)
      {
        var index = evt.target.array_index;
        console.log(index);
        urls[index].name = name_elem.value;
        urls[index].href = url_elem.value;
        item_elem.removeChild(name_elem);
        item_elem.removeChild(url_elem);
        row_elem.removeChild(btn3_elem);
        item_elem.appendChild(link_elem);
        row_elem.appendChild(btn2_elem);
        row_elem.appendChild(btn_elem);
        renderList();
      }*/

}
function addItem()
{
  var new_obj = {name: new_elem2.value, href: new_elem.value };
  urls.push(new_obj);
  renderList();
}
renderList();

function preview() {
            (link_elem).miniPreview({ prefetch: 'pageload' });
        }
preview();
