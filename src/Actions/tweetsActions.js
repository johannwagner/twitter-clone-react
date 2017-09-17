import * as axios from 'axios';
import URLConstants from "../Constants/URLConstants";

export default {
    fetchTweets: (clientToken) => {

        let headers = {clientToken: clientToken};
        return {
            type: "FETCH_TWEETS",
            payload: axios.get(URLConstants.TWEETS_ENDPOINT, {headers: headers})
        }
    },
    addReaction(clientToken, ownerId, tweetId, emoteId, callbackFunction) {
        let endpointURL = URLConstants.TWEETS_ENDPOINT + '/' + ownerId + '/' + tweetId + '/reaction';
        let headers = {clientToken: clientToken};
        let transmitData = {
            reactionIdentifier: emoteId
        };

        return {
            type: "ADD_REACTION",
            payload: axios.put(endpointURL, transmitData, {headers: headers}).then(res => {
                callbackFunction();
                return res;
            })
        }
    },
    createTweet(clientToken, tweetBody, referenceTweetId, callbackFunction){
        let headers = {
            clientToken: clientToken
        };
        let transmitData = {
            body: tweetBody,
            referenceTweetId
        };
        return {
            type: 'CREATE_TWEET',
            payload: axios.put(URLConstants.TWEETS_ENDPOINT, transmitData, {headers: headers}).then((res) => {
                callbackFunction();
                return res;
            })
        }
    }
}