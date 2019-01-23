var topics = ["Spider-Man", "The Incredible Hulk", "Captain America", "Thor", "Ant Man", "Black Widow", "Iron Man", "Hawkeye", "Wolverine", "Deadpool", "Scarlet Witch", "Doctor Strange", "Silver Surfer", "Luke Cage", "Nick Fury", "Doctor Doom", "Star Lord", "The Punisher", "Daredevil", "Thanos"];
var gifImages = 10;

function topic()    {
    $("#buttons").empty();

        topics.forEach(function(topic)  {
            var button = $("<button>");
            button.addClass("character");  
            button.attr("data-name", topic);
            button.text(topic);
            $("#buttons").append(button);
            $(".character").css({"background-color": "red", "padding": "2vh", "font-family": "'Vast Shadow', cursive", "text-align": "center", "margin": "2vh", "color": "white", "border": "white solid 2px"});
    });
}
    $("#add-character").on("click", function(event) {
        event.preventDefault();
        var value = $("#marvel-input").val().trim();
        topics.push(value);
        topic();
    });

    function gif()  {
        var topicName = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&apikey=czS0JB7lsbvj3rFAx0UtNP9myRAmTxP6&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            // console.log(JSON.stringify(response));
            var results = response.data;

           for(var i = 0; i < results.length; i++)   {
               
                var rating = results[i].rating;
                var image = results[i].images.fixed_height_small_still.url;

                var marvelDiv = $("<div class='marvel-gif'>");
                var ratingEl = $("<p>").text("Rating: " + rating);
                var imageEl = $("<img height='200' width='200' class='gif'>").attr("src", image);
               
                
                marvelDiv.append(ratingEl, imageEl);
                marvelDiv.css({"padding-top": "1vh", "margin-right": "2vw", "clear": "right", "text-align": "center", "font-family": "'Fjalla One', sans-serif", "margin": "2vw", "width": "11vw", "margin-left": "2vw", "float": "left", "color": "white", "background": "red", "filter:": "alpha(opacity=90)", "-moz-opacity": "0.9", "-khtml-opacity": "0.9", "opacity": "0.9"});   

                $("#giftastic").prepend(marvelDiv);

            }   

            $(".marvel-gif").on("click", function() {
                
                imageEl.attr("src", results[i].images.fixed_height_small_still.url);
                imageEl.attr("data-state", "still");
                imageEl.attr("data-still", results[i].images.fixed_height_small_still.url);
                imageEl.attr("data-animate", results[i].images.fixed_height_small.url);
                var state = $(this).attr("data-state");
                if (state === "still") {
                    
                console.log("gif clicked");
                   
                    $(this).attr("src", $(this).attr("animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        }).catch(function(error)    {
            console.log(error);
    });
}
    $(document).on("click", ".character", gif);  
        
    
    topic();



        