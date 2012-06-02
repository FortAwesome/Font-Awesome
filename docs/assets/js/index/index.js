$(function() {
    var MainView = Backbone.View.extend({
        el: $("div.container"),

        modalTemplate: _.template($("#modal-template").html()),

        events:{
            "click ul.the-icons > li": "iconClicked"
        },

        iconClicked: function(event) {
            event.preventDefault();

            var $item = $(event.currentTarget);
            var $modal = $(this.modalTemplate({"iconName": $item.find("i").attr("class")}));

            $modal.modal("show");
            $modal.on('hidden', function () {
                $modal.remove();
            })
        }
    });

    var mainView = new MainView();
});
