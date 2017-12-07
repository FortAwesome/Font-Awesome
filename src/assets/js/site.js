$(function () {
  $("#newsletter").validate();

  var ads = [
    {
      quote: "Get 2,000+ icons with Font Awesome Pro and <strong>ALL</strong> KS rewards for just $60!",
      class: "fa5",
      url: "https://fontawesome.com/?utm_source=font_awesome_homepage&utm_medium=display&utm_campaign=fa5_released&utm_content=banner",
      btn_text: "Check out FA Pro &nbsp;<i class='fas fas-external-link'></i>",
    },
  ];

  // selectAd();

  // start the icon carousel
  $('#icon-carousel').carousel({
    interval: 5000
  });

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  if (storageAvailable('localStorage') && !localStorage.seenFA5ReleasedModal) {
    $('#modal-fa5')
      .modal('toggle')
      .on('hidden.bs.modal', function (e) {
        $('#fa5-iframe').remove();
      });
    ;
  }

  if (storageAvailable('localStorage')) {
    localStorage.seenFA5ReleasedModal = true;
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
