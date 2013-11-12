$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  if ($("table.cheatsheet").length) {
    $.extend($.tablesorter.themes.bootstrap, {
      icons    : "fa fa-inverse",
      sortAsc  : "fa-chevron-up",
      sortDesc : "fa-chevron-down"
    });
    $("table.cheatsheet").tablesorter({
      theme: "bootstrap",
      headerTemplate: "{content}{icon}",
      widgets: ["zebra", "uitheme", "filter"],
      widgetOptions: {
        filter_functions: {
          // add category select options
          3: {
            "Brand Icons"           : function(txt) { return /Brand/.test(txt); },
            "Currency Icons"        : function(txt) { return /Currency/.test(txt); },
            "Directional Icons"     : function(txt) { return /Directional/.test(txt); },
            "Text Editor Icons"     : function(txt) { return /Editor/.test(txt); },
            "Form Control Icons"    : function(txt) { return /Form/.test(txt); },
            "Medical Icons"         : function(txt) { return /Medical/.test(txt); },
            "Video Player Icons"    : function(txt) { return /Video/.test(txt); },
            "Web Application Icons" : function(txt) { return /Web/.test(txt); }
          }
        }
      },
      textExtraction: {
        0 : function(node) {
          // convert hex to decimal
          return parseInt( $(node).attr("data-id"), 16 );
        },
        2 : function(node){
          // convert unicode hex to decimal
          return parseInt( $(node).text().replace(/&#x/,""), 16 );
        }
      }
    });
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
