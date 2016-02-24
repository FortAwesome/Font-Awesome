$(function () {
  $("#newsletter").validate();

  var ads = [
    // {
    //   quote: "Take your icon game to the next level. Check out <strong>Fonticons</strong>, from the maker of Font Awesome.",
    //   class: "fonticons",
    //   url: "https://fonticons.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_1_next_level&utm_campaign=promo_4.4_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "Make your icons load 10x faster! Check out <strong>Fonticons</strong>, from the maker of Font Awesome.",
    //   class: "fonticons",
    //   url: "https://fonticons.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_3_faster_loading&utm_campaign=promo_4.4_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "Looking for other great icon sets? Check out <strong>Fonticons</strong>, from the maker of Font Awesome.",
    //   class: "fonticons",
    //   url: "https://fonticons.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_4_more_icons&utm_campaign=promo_4.4_update",
    //   btn_text: "Gimme Some!"
    // },
    // {
    //   quote: "Want to add your own icon? Check out <strong>Fonticons</strong>, from the maker of Font Awesome.",
    //   class: "fonticons",
    //   url: "https://fonticons.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_6_your_own_icon&utm_campaign=promo_4.4_update",
    //   btn_text: "Gimme Some!"
    // },
    //
    //
    // {
    //   quote: "<strong>Black Tie</strong>, from the creator of Font Awesome. On sale at the Kickstarter price for a limited time.",
    //   class: "black-tie",
    //   url: "http://blacktie.io/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_2_kickstarter&utm_campaign=promo_4.4_update",
    //   btn_text: "Check it Out!"
    // },
    // {
    //   quote: "Want clean, minimalist icons? Check out <strong>Black Tie</strong>, the new multi-weight icon font from the maker of Font Awesome.",
    //   class: "black-tie",
    //   url: "http://blacktie.io/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_5_clean_minimalist&utm_campaign=promo_4.4_update",
    //   btn_text: "Check it Out!"
    // },
    // {
    //   quote: "Want a different icon look? Check out <strong>Black Tie</strong>, our new multi-weight icon set.",
    //   class: "black-tie",
    //   url: "http://blacktie.io/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_6_different_look&utm_campaign=promo_4.4_update",
    //   btn_text: "Check it Out!"
    // },
    // {
    //   quote: "Check out <strong>Black Tie</strong>, our new multi-weight icon set!",
    //   class: "black-tie",
    //   url: "http://blacktie.io/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_7_our_new_multi_weight&utm_campaign=promo_4.4_update",
    //   btn_text: "Check it Out!"
    // },
    {
      quote: "<strong>Help make Font Awesome more awesome!</strong> Fill out a 6-minute survey and give us your feedback.",
      class: "font-awesome-survey",
      url: "http://fontawesome.io/survey/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=ad_survey&utm_campaign=promo_4.5_update",
      btn_text: "Take the survey!"
    }
  ];

  selectFonticonsAd();

  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  function selectFonticonsAd() {
    random_number = Math.floor(Math.random() * ads.length);
    random_ad = ads[random_number];

    $('#banner').addClass(random_ad.class);
    $('#rotating-message').html(random_ad.quote);
    $('#rotating-url').attr("href", random_ad.url);
    $('#rotating-url').html(random_ad.btn_text);
    $('#banner').collapse('show');
  }
});
