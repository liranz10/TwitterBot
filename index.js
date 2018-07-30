console.log("Starting Bot");
//import the files from twit library,
var Twit = require('twit')
//creation of a twitter object
var T = new Twit({
    consumer_key:         'Po3DWu3cYIKwg87PxenXSUVUV',
    consumer_secret:      'l9gzzygNvfqP0Z71XUZSokAkD4rNrmFsjqzjwFl7kI4W3lHItZ',
    access_token:         '821820867839721472-E0UoMc4ryOXK5QpP4Rbgb9WGw2ESSnB',
    access_token_secret:  'hfmu7M5Awy2kWRIZgclubMd7CJBU1aOefbij2aKxcuCUm',
});


// hashtag
 var qry ="#sportupdate";
 //response text comment.
 var botComment = "Amazing! Wonderful tweet! ";
 
  var params = {
     q:qry,
     result_type: 'recent',
	 lang: 'en'
 };

 //Bot is looking for tweet with specific hashtag.
 T.get("search/tweets",params,getDataFromTweet);
 

  function getDataFromTweet(error, data){
      if(!error){
        var resultTweetId = data.statuses[0].id_str;//The current tweet's id
        var resultTweetUserName = data.statuses[0].user.screen_name;//The current tweet's author name.
		var resultTweetText = data.statuses[0].text;//The current tweet's author name.

        postCommentTweet(resultTweetId,resultTweetUserName,botComment,resultTweetText);
      }
      else{
          console.log("error on search of tweet's :(");
          console.log(error);
      }
  }
  //Post a tweet as a comment to the tweet
  function postCommentTweet(resultTweetId,resTweetUserName,botComment,resultTweetText){
      
      var dataRetweet = {
          status:botComment +"\n"+ "@" + resTweetUserName + "\n " + resultTweetText + ' https://twitter.com/twitter/statuses/994483342086164480',
          in_reply_to_status_id: resultTweetId
      };
     
      //Add the new tweet as response to the selected tweet.
      T.post("statuses/update",dataRetweet,checkError);
  } 
 
   //Function that checks if the retweet had done successfuly
  function checkError(error,response){
       if(!error){
          console.log("retweeted successfuly!:)");
       }
       else{
          console.log("There is an error in retweet :");
          console.log(error);
       }
  }
