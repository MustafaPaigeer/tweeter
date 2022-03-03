/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
     
        $('form').validate({
            rules: {
              text : {
                required: true,
                minlength: 1,
                maxlength: 140
              },
            },
            messages : {
              text: {
                minlength: "Tweets cannot be empty character",
                maxlength: "Tweet shouldn't be more than 140 characters"
              }}});
    
        // const tweetText = $('#tweet-text').val();
        // if (tweetText.length < 1) {
        //     alert("Form cannot be empty")
        // } else if (tweetText.length > 140) {
        //     alert ("form cannot exceed 150 char")
        // } else {
            let serializedData = $('form').serialize();
        
            $.ajax({
                url: "/tweets",
                type: "post",
                data: serializedData
            })
            .then((data) => {
    
 
            })
        // }
    });

  const loadTweets = () => {
        $.ajax('/tweets', { method: 'GET' })
        .then((tweets) => {
          renderTweets(tweets);
        });
   };
  loadTweets()
      const createTweetElement = (tweet) => {
        const myTweet = `
        <article class="tweet">
        <header>
            <div>
                <img src="${tweet['user'].avatars}">
                <p>${tweet['user'].name}</p>
            </div>
            <p>${tweet['user'].handle}</p>
        </header>
        <p>${tweet['content'].text}</p>
        <footer>
            <p>${timeago.format(tweet['created_at'])}</p>
            <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
        </article>
        `
        return myTweet;
    }
    
    const renderTweets = function(tweets) {
        // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
          for (const tweetData in tweets) {
              const $tweet = createTweetElement(tweets[tweetData]);
              $('#tweetContainer').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
          }
      }

});