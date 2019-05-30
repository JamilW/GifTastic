// My themed topics listed in array
var topics = ["Spider-Man", "The Incredible Hulk", "Captain America", "Thor", "Ant Man", "Black Widow", "Iron Man", "Hawkeye", "Wolverine", "Deadpool", "Scarlet Witch", "Doctor Strange", "Silver Surfer", "Luke Cage", "Nick Fury", "Doctor Doom", "Star Lord", "The Punisher", "Daredevil", "Thanos"];

// Overall function to provide app functionality
function topic()    {
// Ensures no repeats for buttons
    $("#buttons").empty();
// For loop to render buttons from topic list
        topics.forEach(function(topic)  {
            var button = $("<button>");
            button.addClass("character");  
            button.attr("data-name", topic);
            button.text(topic);
            $("#buttons").append(button);
            $(".character").css({"background-color": "red", "padding": "2vh", "font-family": "'Vast Shadow', cursive", "text-align": "center", "margin": "2vh", "color": "white", "border": "white solid 2px"});
    });
}
// Function to add another Marvel character button from user input
    $("#add-character").on("click", function(event) {
        event.preventDefault();
        var value = $("#marvel-input").val().trim();
        topics.push(value);
        topic();
    });

// Function for rendering gifs on screen upon button click
    function gif()  {
// Emptying any prior gifs upon clicking on new topic button        
        $("#giftastic").empty();
// AJAX to grab API data     
        var topicName = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&apikey=czS0JB7lsbvj3rFAx0UtNP9myRAmTxP6&limit=10";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
// For loop to assign buttons to array of topics
            for(var i = 0; i < results.length; i++)   {
                var rating = results[i].rating;
                var image = results[i].images.fixed_height_small_still.url;
        
                var marvelDiv = $("<div class='marvel-gif'>");
                var ratingEl = $("<p>").text("Rating: " + rating);
                var imageEl = $("<img height='200' width='200' class='gif'>").attr("src", image);

                imageEl.attr("data-state", "still");
                imageEl.attr("data-still", results[i].images.fixed_height_small_still.url);
                imageEl.attr("data-animate", results[i].images.fixed_height_small.url)                
                // imageE1.css({"font-family": "'Cinzel', serif"});

                marvelDiv.append(ratingEl, imageEl);
                marvelDiv.css({"padding-top": "1vh", "clear": "right", "text-align": "center", "font-family": "'Cinzel', serif", "margin": "0 2vw 2vw 0", "width": "11vw", "margin-left": "2vw", "float": "left", "color": "white", "box-shadow": "0 20px 20px 15px red"});   

                $("#giftastic").prepend(marvelDiv);
            }   
// Get gif to animate upon click and pause upon second click
            $(".marvel-gif").on("click", ".gif", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    console.log("gif clicked");
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
// Function for logging AJAX errors to console            
        }).catch(function(error)    {
            console.log(error);
    });
}
// Calling functions
    $(document).on("click", ".character", gif);  
        
    topic();