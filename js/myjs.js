$(document).ready(function() {
    console.log("Un mensaje de prueba");
    $("#search-input").on("keydown", function(e) {
        if (e.keyCode === 13 & $("#search-input").val().trim() !== "") {
            searchWikipedia();
        }
    });
    $(".search-button").on("click", function(e) {
        if ($("#search-input").val().trim() !== "") {
            searchWikipedia();
        }
    });
    $(".white-anchor").on("click", function(e) {
        $(".white-anchor").addClass("hide");
        $("li").remove();
    });

    function searchWikipedia() {
        var searchText = $("#search-input").val().trim();
        $("#search-input").val("");
        $(".preloader-wrapper").removeClass("hide");
        $(".preloader-wrapper").addClass("active");
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            data: { action: 'query', list: 'search', srsearch: searchText, format: 'json' },
            dataType: 'jsonp',
            success: function(x) {
                $(".preloader-wrapper").addClass("hide");
                $(".preloader-wrapper").removeClass("active");
                $(".white-anchor").removeClass("hide");
                try {
                    $("li").remove();
                    x.query.search.forEach(function(searchResult) {
                        console.log(searchResult.title.replace(/ /g, "_"));
                        var searchResultCollapsible = '<li><div class="collapsible-header">' + searchResult.title + '</div><div class="collapsible-body">' + searchResult.snippet + '... <a class="read-more-link" href="https://en.wikipedia.org/wiki/' + encodeURI(searchResult.title.replace(/ /g, "_")) + '" target="_blank">Read More</a></div></li>';
                        $(".search-results ul").append(searchResultCollapsible);
                    }, this);
                    console.log('search length: ', x.query.search.length);
                    console.log('search: ', x.query.search);
                } catch (TypeError) {

                }
            }
        });
    }
});