import {Component} from "react";
import * as axios from 'axios';
import {connect} from "react-redux";
import * as React from "react";
import URLConstants from "../Constants/URLConstants";
import './EmoteSelector.css'
import emoteActions from "../Actions/emoteActions";
import tweetsActions from "../Actions/tweetsActions";

class EmoteSelector extends Component {

    constructor(props) {
        super(props);

        console.log(props);

        if(!this.props.emotes.emotesAvailable && !this.props.emotes.emotesPending){
            this.props.fetchEmotes();
        }
    }

    addEmote(emoteId) {
        this.props.selectEmote(this.props.authentication.clientToken, this.props.ownerId, this.props.tweetId, emoteId)
    }

    render() {

        if(!this.props.emotes.emotesAvailable){
            return null;
        }

        let emoteList = this.props.emotes.emotes;

        let emotes = Object.keys(emoteList).map((key, index) => {
            let emote = emoteList[key];
            return (<img key={emote.id} onClick={this.addEmote.bind(this, emote.id)} src={"https://static-cdn.jtvnw.net/emoticons/v1/" + emote.id + "/1.0"} />)
        });

        return (
            <div className="emoteList">
                {emotes}
            </div>
        );
    }
}


let mapStateToProps = state => {
    return {
        authentication: state.authentication,
        emotes: state.emotes
    }
};

let mapDispatchToProps = dispatch => {
    return {
        fetchEmotes: () => {
           dispatch(emoteActions.fetchEmotes());
        },

        selectEmote: (clientToken, ownerId, tweetId, emoteId) => {
            dispatch(tweetsActions.addReaction(clientToken, ownerId, tweetId, emoteId, () => {
                dispatch(tweetsActions.fetchTweets(clientToken));
            }));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EmoteSelector);