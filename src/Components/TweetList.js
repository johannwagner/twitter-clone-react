import {connect} from "react-redux";
import {Component} from "react";
import * as axios from 'axios';
import URLConstants from "../Constants/URLConstants";
import * as React from "react";
import Tweet from "./Tweet";
import './TweetList.css'
import tweetsActions from "../Actions/tweetsActions";
class TweetList extends Component {

    componentDidMount() {
        this.props.fetchTweets(this.props.authentication.clientToken)
    }

    render(){

        if(!this.props.tweets.tweets){
            return null;
        }

        let tweets = this.props.tweets.tweets.map((tweet) => {
            return (
                <Tweet key={tweet.id} tweet={tweet}/>
            );
        });

        return (
            <div className="tweetList">
                {tweets}
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        authentication: state.authentication,
        tweets: state.tweets
    }
};

let mapDispatchToProps = dispatch => {
    return {
        fetchTweets: (clientToken) => {
            dispatch(tweetsActions.fetchTweets(clientToken))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList)