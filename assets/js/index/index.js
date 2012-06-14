$(function() {
  // start the icon carousel
  $('#iconCarousel').carousel({
    interval: 5000
  });

  // make code pretty
  window.prettyPrint && prettyPrint();

  // inject twitter & github counts
  $.ajax({
    url: 'http://api.twitter.com/1/users/show.json',
    data: {screen_name: 'fortaweso_me'},
    dataType: 'jsonp',
    success: function(data) {
      $('#followers').html(data.followers_count);
    }
  });
  $.ajax({
    url: 'https://api.github.com/repos/fortawesome/Font-Awesome',
    dataType: 'jsonp',
    success: function(data) {
      $('#watchers').html(data.data.watchers);
      $('#forks').html(data.data.forks);
    }
  });





  var firstInHistory = true;

  var MainView = Backbone.View.extend({
    el: $("div.container"),

    modalTemplate: _.template($("#modal-template").html()),

    events:{
      "click ul.the-icons > li": "iconClicked"
    },

    iconClicked: function(event) {
      event.preventDefault();

      var $item = $(event.currentTarget);
      var $iconName = $item.find("i").attr("class");
      _gaq.push(['_trackEvent', 'iconClick', $iconName]);

      mainRouter.navigate("icon/" + $iconName, {trigger: true});
      firstInHistory = false;
    }
  });


  var MainRouter = Backbone.Router.extend({
    routes: {
      "": "checkModal",
      "icon/:iconName": "showIcon"
    },

    checkModal: function() {
      var $modal = $("div.modal");
      
      if ($modal.length > 0) {
        $modal.modal("hide");
      }
    },

    showIcon: function(iconName) {
      var $modal = $(mainView.modalTemplate({"iconName": iconName}));

      $modal.modal("show");
      $modal.on('hidden', function () {
        $modal.remove();
        if (firstInHistory) {
          mainRouter.navigate("/", {trigger: false});
          firstInHistory = false;
        } else {
          window.history.back();
        }
      })
    }
  });

  var mainView = new MainView();
  var mainRouter = new MainRouter();
  Backbone.history.start({pushState : false});
});
