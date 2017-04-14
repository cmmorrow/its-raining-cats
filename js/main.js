$(document).on('ready', function() {
  // drop a cat every second
  setInterval(function() {
    // create the cat
    var $newCat = $('<img class="cat" src="https://s-media-cache-ak0.pinimg.com/736x/2c/1e/db/2c1edb6ae126cb6c79b13ff839b1e3d3.jpg">');

    // start the cat in a random spot on the board
    $newCat.css('left', randomNum());

    // show the cat
    $('body').append($newCat);

    // drop this cat
    dropCat($newCat);
  }, 1000);

  var boardSize = $('.board').width();
  var scoreCount = 0;

  // move the basket
  $('body').on('keydown', function(e) {
    var key = e.keyCode,
        left = 37,
        right = 39,
        $basket = $('.basket'),
        basketLeft = $basket.offset().left,
        maxBasketLeft = boardSize - $basket.width();

    // can't move the cat off the edge of the board
    if(key === left ) {
      var newBasketLeft = basketLeft - 75

      if(newBasketLeft < 0) {
        $basket.css('left', 0);
      } else {
        $basket.css('left', basketLeft - 75);
      }
    } else if(key === right) {
      var newBasketLeft = basketLeft + 75;

      if(newBasketLeft > maxBasketLeft) {
        $basket.css('left', maxBasketLeft);
      } else {
        $basket.css('left', basketLeft + 75);

      }
    }
  });

  function dropCat($cat) {
    var fallingCat = setInterval(function() {
      $cat.css('top', $cat.offset().top + 40);
      checkCollision($cat);
    }, 500);

    var catHeight = $('.cat').height();

    // add 1 because we want the cat to disappear when its top edge hits the box, not its bottom edge
    var maxCatFallingSeconds = boardSize/catHeight + 1;
    var maxCatFallingMilliseconds = maxCatFallingSeconds * 1000;

    // remove cats when they fall off the board
    setTimeout(function() {
      $cat.hide();

      // stop dropping the cat
      clearInterval(fallingCat);
    }, maxCatFallingMilliseconds);
  }

  function randomNum() {
    var catWidth = $('.cat').width();
    // cats can't start outside the board
    var max = boardSize - catWidth;
    return Math.floor(Math.random() * (max));
  }

  function checkCollision($cat) {
    var $basket = $('.basket'),
        basketTop = $basket.offset().top,
        catBottom = $cat.offset().top + $cat.height(),
        basketLeft = $basket.offset().left,
        catLeft = $cat.offset().left,
        basketRight = basketLeft + $basket.width(),
        catRight = catLeft + $cat.width();

    if(catBottom > basketTop &&
       catLeft > basketLeft &&
       catRight < basketRight
    ) {
      $cat.hide();

      // increase the score by 1
      scoreCount = scoreCount + 1;

      // display the score
      $('.score').html(scoreCount);
    }
  }
});
