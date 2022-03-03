/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//  const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]


$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let serializedData = $('form').serialize();
        $.ajax({
            url: "/tweets",
            type: "post",
            data: serializedData
        })
        .then((data) => {
            console.log(data);
            console.log('fire')
        })
    })

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