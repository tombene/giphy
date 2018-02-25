
var giftastic = {
	topics: ['board games', 'brooklyn 99', 'princess bride', 'fails'],
	btnTopics: function () {

		for (var i = 0; i < this.topics.length; i++) {
			var li = $('<li>'), a = $('<a href="#">');
			li.append(a);
			a.attr('class', 'topic-buttons');
			a.attr('data-topic', i);
			// btn.attr('id', 'topic' + i);
			a.text(this.topics[i]);
			$('.button-holder').append(li);
		}
	}
}

$(document).ready(function () {
	giftastic.btnTopics();
});

// Event listener for all button elements
$(document).on('click', ".topic-buttons", function () {
	var topicPressed = $(this).attr('data-topic');
	var offSet = Math.floor(Math.random() * Math.floor(1000));
	console.log(offSet);
	$('.gif-container').remove();
	// Constructing a URL to search Giphy for the topic clicked
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giftastic.topics[topicPressed] + "&api_key=c0o7XlTPI0UapWPCMit6jCnhqH9D3wPz&limit=10&rating=pg&offset=" + offSet;
	// var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=c0o7XlTPI0UapWPCMit6jCnhqH9D3wPz&tag=" + giftastic.topics[topicPressed];
	// Performing our AJAX GET request
	$.ajax({
		url: queryURL,
		method: "GET"
	})
		// After the data comes back from the API
		.then(function (response) {
			// Storing an array of results in the results variable
			var results = response.data;

			// Looping over every result item
			for (var i = 0; i < results.length; i++) {

				// Only taking action if the photo has an appropriate rating
				// if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
					// Creating a div with the class "item"
					var gifDiv = $("<div class='col-md-4 gif-container' >");
					var stillImage = results[i].images.fixed_height_still.url;
					var animatedGif = results[i].images.fixed_height.url;

					// Storing the result item's rating
					var rating = results[i].rating;

					// Creating a paragraph tag with the result item's rating
					var pTag = $("<p>").text("Rating: " + rating);

					// Creating an image tag
					var personImage = $("<img>");
					personImage.attr('class', 'gif-image thumbnail');
					personImage.attr('id', 'id="gif-"' + i + '"');
					personImage.attr('data-still', stillImage);
					personImage.attr('data-animated', animatedGif);
					personImage.attr('data-paused', 'true');
					// Giving the image tag an src attribute of a proprty pulled off the
					// result item
					personImage.attr("src", stillImage);

					// Appending the paragraph and personImage we created to the "gifDiv" div we created
					gifDiv.append(pTag);
					gifDiv.append(personImage);

					// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
					$("#show-the-gifs").append(gifDiv);
				}
			// }
		});

});

$(document).on('click', '.gif-image', function () {
	var paused = $(this).attr('data-paused');
	if (paused === 'true') {
		$(this).attr('data-paused', 'false');
		$(this).attr('src', $(this).attr('data-animated'));
	} else {
		$(this).attr('data-paused', 'true');
		$(this).attr('src', $(this).attr('data-still'));
	}
});

$('#add-button').on('click', function (e) {
	e.preventDefault();
	// var btn = $('<button>');
	// btn.attr('class', 'topic-buttons btn btn-success');
	// btn.attr('data-topic', );
	// // btn.attr('id', 'topic' + i);
	// btn.text($('#user-topic').val());
	// $('.button-holder').append(btn);
	// $('#user-topic').val('');
	var li = $('<li>'), a = $('<a href="#">');
	li.append(a);
	a.attr('class', 'topic-buttons label-success');
	a.attr('data-topic');
	a.text($('#user-topic').val());
	$('.button-holder').append(li);
	$('#user-topic').val('');
});