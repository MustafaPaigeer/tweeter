let i = 140;

$(document).ready(function () {

    // --- counts the number of characters in the tweet ---

    const countTweet = (tweetLength) => {
        return i - Number(tweetLength);
    }

    $("#tweet-text").keyup(function () {
        const tweetLength = $("#tweet-text").val().length;
        const outputLength = countTweet(tweetLength)
        if (outputLength >= 0) {
            $("output").css({ 'color': 'black' });
            $("output").text(outputLength);
        } else {
            $("output").css({ 'color': 'red' });
            $("output").text(outputLength);
        }
    })
});