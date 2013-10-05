jQuery(function($) {
  // start the icon carousel
  $('#iconCarousel').carousel({
    interval: 5000
  });


   // filter icons when search entered
   $('#filterBoxText').on({'keyup': filter, change: filter});
   $('#filterBoxIcon').on('click', function() {
      $('#filterBoxText').val('').triggerHandler('change');
   });

   function filter() {
      var $iconCells = $('.the-icons .span3');
      var text = $('#filterBoxText').val();
      var hasText = !!text;

      $('#new,h2').toggle(!hasText);
      $('#filterBoxIcon')
         .prop('disabled', !hasText)
         .find('i')
         .toggleClass('icon-search', !hasText)
         .toggleClass('icon-remove', hasText);

      $('div.lists-of-icons').toggleClass('search-active', hasText);

      if( hasText ) {
         $iconCells.hide().filter(function() {
            return !!$(this).text().match(text);
         }).show();
      }
      else {
         $iconCells.show();
      }
   }
   filter();

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
