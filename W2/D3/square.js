var box_elem = document.getElementById('box');
box_elem.first_color = true;

function pageLoaded()
{
  var duration = 1000;
  box_elem.onclick = function() {
    duration = (duration / 2);
  }
  if(box_elem.first_color)
  {
  box.style.background= "blue";
  box_elem.first_color = false;
  }
  else
  {
  box_elem.style.background = "yellow";
  box_elem.first_color = true;
  }
  window.setTimeout(pageLoaded, duration);
}
