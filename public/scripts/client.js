/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  $('#is-empty').hide();
  $('#exceeds').hide();

  $('form').on('submit', function (event) {
    $('#is-empty').hide();
    $('#exceeds').hide();

    event.preventDefault();

    const tweetText = $('#tweet-text').val();
    if (tweetText.length < 1) {
      $('#is-empty').slideDown();
      return;
    } else if (tweetText.length > 140) {
      $('#exceeds').slideDown();
      return;
    } else {
      let serializedData = $('form').serialize();

      $.ajax({
        url: "/tweets",
        type: "post",
        data: serializedData
      })
        .then((data) => {
          loadTweets();
          $('#tweet-text').val('');
          $('output').text('140');
        })
    }
  });

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  loadTweets();

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
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweetData in tweets) {
      const $tweet = createTweetElement(tweets[tweetData]);
      $('#tweetContainer').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  $('textarea').on('focus', () => {
    $('#is-empty').hide();
    $('#exceeds').hide();
  });

});