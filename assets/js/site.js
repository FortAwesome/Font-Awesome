$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  var quotes = new Array(
      "Please support <strong>Black Tie</strong>, the new icon font from Font Awesome!",
      "Please help me make Font Awesome <strong>Black Tie</strong>!",
      "Get your company logo added to Font Awesome!",
      "Need a specific icon added to Font Awesome?",
      "If you like Font Awesome, you're going to love <strong>Black Tie</strong>!"
    ),
    random_quote = quotes[Math.floor( Math.random() * quotes.length )];
  $('.tagline').html(random_quote);
});
