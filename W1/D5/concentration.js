var content_elem = document.getElementById('content');
var board_elem = document.getElementById('board');
var clicked_cards =  [];
var counter = 0;
var ROWS = 3;
var COLS = 4;

function pageLoaded()
{
  var imgs = [];
  for (var i = 0 ; i < 6; i++)
    {
  imgs.push("Images/img0" + i + ".png");
  imgs.push("Images/img0" + i + ".png");
    }
  for (var r = 0; r < ROWS; r++)
  {
    var row_elem = document.createElement('tr');
    for (var c = 0; c < COLS; c++)
    {
        var cell_elem = document.createElement('td');
        var secret_elem = document.createElement('img');
        var visible_elem = document.createElement('img');
        board_elem.appendChild(row_elem);
        row_elem.appendChild(cell_elem);
        cell_elem.appendChild(visible_elem);
        visible_elem.src = "Images/card_back.png"
        visible_elem.c = c;
        visible_elem.r = r;
        var rand = getRandomInt(0, imgs.length - 1);
        visible_elem.img = imgs[rand];
        imgs.splice(rand, 1);
        visible_elem.onclick = clickCard;
      }
    }


  }

function clickCard( evt )
{
  var card = evt.target;
  evt.target.src = evt.target.img;
  clicked_cards.push(evt.target);
  console.log(clicked_cards[1]);
  if( clicked_cards[1] !== undefined)
  {
  window.setTimeout(flipCard, 1000, clicked_cards, card)
  }
}

function flipCard( stored, target)
{
    console.log(stored[0]);
    console.log(stored[1]);
    if(stored[0].img !== stored[1].img )
    {
    stored[0].src = "Images/card_back.png";
    stored[1].src = "Images/card_back.png";
    stored.splice(0, 1);
    stored.splice(0, 1);
    }
    else if(stored[0].c !== stored[1].c || stored[0].r !== stored[1].r  )
    {
      counter = counter + 1;
      if(counter == 6)
      {
        var sound = document.createElement('audio');
        sound.src= "Images/cheering.mp3"
        sound.play();
        alert("You won! reload to play again.");
      }
    stored.splice(0, 1);
    stored.splice(0, 1);
    }
    else
    {
      stored[0].src = "Images/card_back.png";
      stored.splice(0, 1);
      stored.splice(0, 1);
    }
  }

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
