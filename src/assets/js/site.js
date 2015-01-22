$(function() {
  var ads = [
    { quote: "Take your icon game to the next level.", content: "ad_1_next_level"},
    { quote: "Subset your icons, add your own, and serve up from a CDN.", content: "ad_2_all_value_add"},
    { quote: "Make your icons load 10x faster!", content: "ad_3_faster_loading"},
    { quote: "Looking for other great icon sets?", content: "ad_4_more_icons"},
    { quote: "Need a custom icon in Font Awesome?", content: "ad_5_custom_icons"}
  ];

  selectFonticonsAd();

  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  var $filter_by = $('#filter-by');

  // Filter icons
  if($filter_by.length) {
    var $filter_val = $('#filter-val');
    var $filter = $('#filter');
    var $other = $('#new, #web-application, #transportation, #gender, #form-control, #medical, #currency, #text-editor, #directional, #video-player, #brand, #file-type, #spinner, #payment, #chart');
    var $clear = $('#filter-clear');
    var $no_results = $('#no-search-results');

    var $icons = $('.filter-icon', $filter);

    // Add tab completion
    $filter_by.tabcomplete(filterSet, {
      arrowKeys: true
    });

    $clear.on('click', function(e) {
      e.preventDefault();
      $filter_by
        .val('')
        .trigger('input')
        .trigger('keyup')
        .focus();

      $clear.addClass('hide'); // Hide clear button
    });


    $filter_by.on('keyup', function() {
      var $this = $(this);
      var val = $this.val().toLowerCase();
      $filter.toggle(!!val);
      $other.toggle(!val);
      $clear.toggleClass('hide', !val);
      $filter_val.text(val);

      if(!val) return;

      var resultsCount = 0;
      $icons.each(function() {
        var filter = $(this).attr('data-filter').split('|');
        var show = inFilter(val, filter);
        if (!show) {
          if (val.slice(-1) === 's') {
            // Try to be smart. Make plural terms singular.
            show = inFilter(val.slice(0, -1), filter);
          }
        }
        if (show) resultsCount++;
        $(this).toggle(!!show);
      });

      if( resultsCount == 0 && val.length != 0 ) {
        $no_results.find('span').text(val);
        $no_results.show();
      } else {
        $no_results.hide();
      }
    });
  }

  function inFilter(val, filter) {
    for (var i = 0; i < filter.length; i++) {
      if (filter[i].match(val)) return true;
    }
    return false;
  }

  $filter_by
    .val('')
    .trigger('input')
    .trigger('keyup');

  if ($clear) {
    $clear.addClass('hide'); // Hide clear button
  }

  function selectFonticonsAd() {
    random_number = Math.floor( Math.random() * ads.length );
    random_ad = ads[random_number];

    $('#rotating-message').html(random_ad.quote);
    $('#rotating-url').attr("href", "https://fonticons.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_content=" + random_ad.content + "&utm_campaign=promo_4.3_update");
  }
});
