$(function() {
  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  // setup icons filter
  $('#icons-filter').hideseek({
    highlight: true,
    list: ".fontawesome-icon-list",
    nodata: 'No icons found'
  });
});
