$(function () {
  $("#newsletter").validate();

  var ads = [
    // {
    //   quote: "<i class='fas fas-perfect fas-2x valign-middle margin-right'></i>Looking for the best icon sets? Check out <strong>Symbolset</strong>, <a href='https://articles.fortawesome.com/fort-awesome-acquires-symbolset-72229dab2c13'>now</a> from the maker of Font Awesome.",
    //   class: "symbolset",
    //   url: "https://symbolset.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_1_best_icons&utm_campaign=promo_4.7_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "<i class='fas fas-curate fas-2x valign-middle margin-right'></i>Need a different look for your icons? Check out <strong>Symbolset</strong>, <a href='https://articles.fortawesome.com/fort-awesome-acquires-symbolset-72229dab2c13'>now</a> from the maker of Font Awesome.",
    //   class: "symbolset",
    //   url: "https://symbolset.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_2_different_look&utm_campaign=promo_4.7_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "Take your icon game to the next level. Check out <strong>Fort Awesome</strong>, from the maker of Font Awesome.",
    //   class: "fort-awesome",
    //   url: "https://fortawesome.com/start?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_1_next_level&utm_campaign=promo_4.7_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "Make your icons load 10x faster! Check out <strong>Fort Awesome</strong>, from the maker of Font Awesome.",
    //   class: "fort-awesome",
    //   url: "https://fortawesome.com/start?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_3_faster_loading&utm_campaign=promo_4.7_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "Want to add your own icon? Check out <strong>Fort Awesome</strong>, from the maker of Font Awesome.",
    //   class: "fort-awesome",
    //   url: "https://fortawesome.com/start?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_6_your_own_icon&utm_campaign=promo_4.7_update",
    //   btn_text: "Gimme Some!"
    // }
    {
      quote: "Font Awesome 5. The most awesome-est Font Awesome ever!",
      class: "kickstarter",
      url: "https://www.kickstarter.com/projects/232193852/font-awesome-5?ref=c92610",
      btn_text: "Check out the Kickstarter",
    },
    {
      quote: "Get 1,000+ more icons and SVG in Font Awesome 5 Pro!",
      class: "kickstarter",
      url: "https://www.kickstarter.com/projects/232193852/font-awesome-5?ref=c92610",
      btn_text: "Check out the Kickstarter",
    },
    {
      quote: "Early backer prices extended and tons of stretch goals already funded!",
      class: "kickstarter",
      url: "https://www.kickstarter.com/projects/232193852/font-awesome-5?ref=c92610",
      btn_text: "Font Awesome 5 Kickstarter",
    },
  ];

  selectAd();

  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  if (storageAvailable('localStorage') && !localStorage.seenKickstarterModal) {
    $('#modal-kickstarter')
      .modal('toggle')
      .on('hidden.bs.modal', function (e) {
        $('#kickstarter-iframe').remove();
      });
    ;
  }

  if (storageAvailable('localStorage')) {
    localStorage.seenKickstarterModal = true;
  	// Yippee! We can use localStorage awesomeness
  }

  function storageAvailable(type) {
  	try {
  		var storage = window[type],
  			x = '__storage_test__';
  		storage.setItem(x, x);
  		storage.removeItem(x);
  		return true;
  	}
  	catch(e) {
  		return false;
  	}
  }
  function selectAd() {
    random_number = Math.floor(Math.random() * ads.length);
    random_ad = ads[random_number];

    $('#banner').addClass(random_ad.class);
    $('#rotating-message').html(random_ad.quote);
    $('#rotating-url').attr("href", random_ad.url);
    $('#rotating-url').html(random_ad.btn_text);
    $('#banner').collapse('show');
  }
});
