$(function() {
    var SearchView = Backbone.View.extend({
        events: {
            "click #search-clear": "clear"
        },

        initialize: function() {
            this.algolia = algoliasearch("M19DXW5X0Q", "c79b2e61519372a99fa5890db070064c");
            this.algoliaHelper = algoliasearchHelper(this.algolia, "font_awesome");
            this.template = _.template($("#results-template").html());

            this.$searchInput = this.$("#search-input");
            this.$searchResultsSection = this.$("#search-results");
            this.$searchInputClear = this.$("#search-clear");
            this.$iconsSection = this.$("#icons");

            this.$searchInput.on("keyup", _.debounce(_.bind(this.search, this), 200));
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

            var results = [];

            _.each(content.hits, function(result) {
                results.push(new SearchResultView({ result: result }).render())
            });

            this.$searchResultsSection.html(this.template({ content: content, results: results.join("") }));
        },

        clearResults: function() {
            this.$searchInput.val("").focus();
            this.$searchResultsSection.addClass("hide");
            this.$searchResultsSection.html("");
            this.$searchInputClear.addClass("hide");
            this.$iconsSection.removeClass("hide");
        }
    });

    var SearchResultView = Backbone.View.extend({
        initialize: function(options) {
            this.template = _.template($("#result-template").html());
            this.result = options.result
        },

        render: function() {
            var matches = [];

            this.pullMatches(matches, this.result._highlightResult.aliases);
            this.pullMatches(matches, this.result._highlightResult.synonyms);

            return this.template({ result: this.result, matches: matches });
        },

        pullMatches: function(matches, list) {
            if (list !== undefined) {
                _.each(list, function(highlight) {
                    if (highlight.matchLevel !== "none") {
                        matches.push(highlight.value)
                    }
                })
            }
        }
    });

    var $searchViewElement = $("[data-view=search]");

    if ($searchViewElement.length > 0) {
        new SearchView({ el: $searchViewElement });
    }
});
