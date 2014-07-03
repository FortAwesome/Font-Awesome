$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  var quotes = new Array(
      "Get your company logo added to Font Awesome!",
      "Want SVG support in Font Awesome? Support the Kickstarter!",
      "Major improvements to Font Awesome at 3000 backers!",
      "Better Font Awesome icon search at 3000 backers!",
      "Need a specific icon added to Font Awesome?",
      "If you like Font Awesome, you're going to love <strong>Black Tie</strong>!"
    ),
    random_quote = quotes[Math.floor( Math.random() * quotes.length )];
  $('.tagline').html(random_quote);
});
