$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  // Filter icons
  if($('#filter-by').length) {
    var $filter_val = $('#filter-val');
    var $filter = $('#filter');
    var $other = $('#new, #web-application, #form-control, #medical, #currency, #text-editor, #directional, #video-player, #brand');
    var $clear = $('#filter-clear');

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

      $icons.each(function() {
        var show = $(this).attr('data-filter').match(' '+val);
        $(this).toggle(!!show);
      });
    }).trigger('keyup');
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
