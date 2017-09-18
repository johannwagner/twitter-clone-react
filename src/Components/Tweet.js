import React, {Component} from "react";
import * as moment from 'moment' ;
import './Tweet.css'
import EmoteSelector from "./EmoteSelector";
import {Overlay, Popover} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/es/OverlayTrigger";
import Button from "react-bootstrap/es/Button";
import TweetCreator from "./TweetCreator";

class Tweet extends Component {


    constructor() {
        super();
        this.state = {
            emoteSelectorOpen: false,
            replyMask: false
        }
    }

    toggleEmoteSelector() {
        this.setState({emoteSelectorOpen: !this.state.emoteSelectorOpen});
    }

    toggleReplyMask(e) {
        this.setState({replyMask: !this.state.replyMask});
    }

    render() {
        let tweet = this.props.tweet;
        let tweetReactions = tweet.reactions;

        let renderableTweetReactions = Object.keys(tweetReactions).map((key, index) => {
           return (
                <div className="emoteContainer" key={key}>
                    <img src={tweetReactions[key][0].imageUrl} alt="Emote"/>
                    <div className="emoteCount">{tweetReactions[key].length}</div>
                </div>
            );
        });

        let tweetReplies = [];
        if(tweet.referenceTweets) {
           tweetReplies = tweet.referenceTweets.map((rT) => {
               return (
                   <Tweet small={true} referenceTweetId={tweet.id} tweet={rT}/>
               )
           });
        }

        return (
            <div className={this.props.small ? 'Tweet TweetSmall': 'Tweet'}>
                <div className="tweetProfilePicture"><img src={"https://uinames.com/api/photos/male/" + tweet.ownerId + ".jpg"} alt={"Profile"}/></div>
                <div className="tweetBody">{tweet.body}</div>
                <div className="tweetCreated">{moment.duration(moment(tweet.createTimestamp).diff(moment())).humanize(true)}</div>
                <div className="tweetOwner">{tweet.displayName}</div>

                <div className={'tweetReplyButton ' + (this.state.replyMask ? 'iconSelected' : '')}>
                    {!this.props.referenceTweetId ? <i className="material-icons" onClick={this.toggleReplyMask.bind(this)}>reply</i> : ''}
                </div>
                <div className={'tweetEmoteButton ' + (this.state.emoteSelectorOpen ? 'iconSelected' :'')}>
                    <i className="material-icons" onClick={this.toggleEmoteSelector.bind(this)}>mood</i>
                </div>
                <div className="tweetReply">
                    {this.state.replyMask ? <TweetCreator referenceTweetId={tweet.id}/> : ''}
                </div>
                <div className="tweetEmotes">
                    {this.state.emoteSelectorOpen ? <EmoteSelector onSelect={() => this.setState({emoteSelectorOpen: false})} ownerId={tweet.ownerId} tweetId={tweet.id}/> : ''}
                </div>
                <div className="tweetReactions">
                    {renderableTweetReactions}

                </div>
                {tweet.referenceTweets && tweet.referenceTweets.length ? <div className="tweetReplys">
                    {tweetReplies}
                </div> : ''}

            </div>
        );
    }

}

export default Tweet;