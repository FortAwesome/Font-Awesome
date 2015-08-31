$(function() {
    var SearchView = Backbone.View.extend({

        template: _.template($("#results-template").html()),

        events: {
            "keyup #search-input": "search",
            "click #search-clear": "clear"
        },

        initialize: function() {
            this.algolia = algoliasearch("M19DXW5X0Q", "c79b2e61519372a99fa5890db070064c");
            this.algoliaHelper = algoliasearchHelper(this.algolia, "font_awesome");

            this.$searchInput = this.$("#search-input");
            this.$searchResultsSection = this.$("#search-results");
            this.$searchInputClear = this.$("#search-clear");
            this.$iconsSection = this.$("#icons");

            this.algoliaHelper.on("result", _.bind(this.showResults, this));
        },

        search: function(event) {
            var query = this.$searchInput.val();

            if (query !== "") {
                this. algoliaHelper.setQuery(query).search();
            } else {
                this.clearResults();
            }
        },

        clear: function(event) {
            event.preventDefault();

            this.clearResults();
        },

        showResults: function(content, state) {
            this.$searchResultsSection.html("");
            this.$searchResultsSection.removeClass("hide");
            this.$searchInputClear.removeClass("hide");
            this.$iconsSection.addClass("hide");
            this.$searchResultsSection.html(this.template({results: content}));
        },

        clearResults: function() {
            this.$searchInput.val("").focus();
            this.$searchResultsSection.addClass("hide");
            this.$searchResultsSection.html("");
            this.$searchInputClear.addClass("hide");
            this.$iconsSection.removeClass("hide");
        }
    });


    var $searchViewElement = $("[data-view=search]");

    if ($searchViewElement.length > 0) {
        new SearchView({ el: $searchViewElement });
    }
});
