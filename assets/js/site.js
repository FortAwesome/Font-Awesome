$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  var quotes = new Array(
      "Donate $1 and help Font Awesome get <strong>MAJOR upgrades!</strong>",
      "Donate $1 and help give Font Awesome <strong>SVG support!</strong>",
      "Donate $1 and help give Font Awesome <strong>better icon search!</strong>",
      "Get your <strong>company logo</strong> added to Font Awesome!",
      "Get your <strong>company logo</strong> added to Font Awesome!",
      "Need a specific icon added to Font Awesome?"
    ),
    random_quote = quotes[Math.floor( Math.random() * quotes.length )];
  $('.tagline').html(random_quote);
});
