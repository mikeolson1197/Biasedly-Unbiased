$(document).ready(function() {

    $(".categories .button").click(function() {
        console.log("HI");
        var kids = $(".categories").children();
        for (var i = 0; i < kids.length; i++) {

            if (kids[i] === this) {
                if (this.className === "button button-primary") {} else {
                    this.className = "button button-primary";
                }
            } else {
                kids[i].className = "button";
            }
        }

        $(".category-selection").empty();
        $(".categories").fadeOut();
        var categorySelection = $(".category-selection");
        var title = $("<h1 style='margin:5px;font-size:2rem;text-align:center;'><span style='padding-right:3px'>" + this.innerHTML + "</span> <i class='fa fa-pencil'></i></h1>");
        var bar = $("<hr style='margin:0'>");

        categorySelection.append(title);
        categorySelection.append(bar);

        $(".category-selection").delay(500).fadeIn();
        findSources(this.id);
    });

    $(".category-selection").on('click', 'i',function() {
        $(".category-selection").empty();
        $(".category-selection").fadeOut();
        $(".categories").fadeIn();

        $(".sources").fadeOut();
        $(".sources").empty();

        $("#results").empty();

    });


    function findSources(kind) {
        $.getJSON('sources.json', function(data) {

            for (var i = 0; i < data.sources.length; i++) {
                if (data.sources[i].type === kind) {
                    console.log(data.sources[i].name);
                    var but = $("<a class='button' id='" + data.sources[i].name + "'>" + data.sources[i].appearance + "</a>");
                    $(".sources").append(but);
                }
            }
            var bar = $("<hr style='margin-top:1rem'>");
            $(".sources").append(bar);
            $(".sources").delay(1000).fadeIn();

        });
    }

    $(".sources").on('click', '.button', function() {
        var counter = 0;
        var sourcesAllowed = 3;
        var kids = $(this).parent().children();
        for (var i = 0; i < kids.length; i++) {
            if (kids[i].className === "button button-primary") {
                counter++;
            }
        }

        console.log("before update " + counter);


        if (this.className === "button button-primary") {
            this.className = "button";
            counter = counter - 1;
            console.log("after update remove " + counter);

            $(".row #" + this.id).remove();
            sizeChanger(counter);


        } else {

            if (counter < sourcesAllowed) {
                this.className = "button button-primary";
                counter++;
                console.log("after update add " + counter);

                var t = $("<div class='' id='" + this.id + "'></div>");
                var author = this.innerHTML;;

                $.getJSON('https://newsapi.org/v1/articles?source=' + this.id + '&sortBy=top&apiKey=c36e4e6a87724fc6942de643f8807f10', function(data) {

                    for (var i = 0; i < data.articles.length; i++) {
                        var art = $("<div class='article'></div");


                        if(data.articles[i].title != null){
                          var title = $("<h1 class='title' style='margin:0px;font-size:2.5rem;text-transform:uppercase'>" + data.articles[i].title + "</h1>");
                          art.append(title);
                        }

                        var source = $("<p class='source' style='margin-top:1.5rem'>" + author + "</p>");
                        art.append(source);

                        if(data.articles[i].description != null){
                          var des = $("<p class='description'>" + data.articles[i].description + "</p>");
                          art.append(des);
                        }

                        if(data.articles[i].urlToImage != null){
                          var img = $("<a href='"+data.articles[i].url+"'><img width='100%' src='" + data.articles[i].urlToImage+"'></img></a>");
                          art.append(img);
                        }

                        var bar = $("<hr style='margin-top:1rem;margin-bottom:1.5rem;border:3px solid #222'>");


                        art.append(bar);
                        t.append(art);
                    }

                });
                $("#results").append(t);
                sizeChanger(counter);

            }



        }

    });

    function sizeChanger(counter) {
        var kids = $("#results").children();

        console.log("we are here");
        console.log(kids);

        if (counter === 1) {
            for (var i = 0; i < kids.length; i++) {
                kids[i].className = "twelve columns";
            }
        }

        if (counter === 2) {
            for (var i = 0; i < kids.length; i++) {
                kids[i].className = "one-half column";
            }
        }

        if (counter == 3) {
            for (var i = 0; i < kids.length; i++) {
                kids[i].className = "one-third column";
            }
        }
    }




});
