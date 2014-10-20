$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  // Filter icons
  if($('#filter-by').length) {
    var $filter_val = $('#filter-val');
    var $filter = $('#filter');
    var $other = $('#new, #web-application, #form-control, #medical, #currency, #text-editor, #directional, #video-player, #brand, #file-type, #spinner, #payment, #chart');
    var $clear = $('#filter-clear');
    var $no_results = $('#no-search-results');

    var $icons = $('.filter-icon', $filter);

    $clear.click(function(e) {
      e.preventDefault();
      $('#filter-by').val('').trigger('keyup').focus();
    });


    $('#filter-by').keyup(function() {
      var $this = $(this);
      var val = $this.val();
      $filter.toggle(!!val);
      $other.toggle(!val);
      $clear.toggleClass('gone', !val);
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
    }).trigger('keyup');
  }

  function inFilter(val, filter) {
    var found = false;
    for (var i = 0; i < filter.length; i++) {
      if (filter[i].match(val)) {
        found = true;
        break;
      }
    }
    return found;
  }




  // make code pretty
//  $('pre').addClass('prettyprint');
//  window.prettyPrint && prettyPrint();

  // Disable links with href="#" inside <section>, so users can click on them
  // to preview :active state without being scrolled up to the top of the page.
//  $('section a[href="#"]').click(function(e) {
//    e.preventDefault();
//    e.stopPropagation();
//  });

//  // inject twitter & github counts
//  $.ajax({
//    url: 'http://api.twitter.com/1/users/show.json',
//    data: {screen_name: 'fortaweso_me'},
//    dataType: 'jsonp',
//    success: function(data) {
//      $('#followers').html(data.followers_count);
//    }
//  });
//  $.ajax({
//    url: 'https://api.github.com/repos/fortawesome/Font-Awesome',
//    dataType: 'jsonp',
//    success: function(data) {
//      $('#watchers').html(data.data.watchers);
//      $('#forks').html(data.data.forks);
//    }
//  });
});
