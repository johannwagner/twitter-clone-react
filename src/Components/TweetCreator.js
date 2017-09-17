import {connect} from "react-redux";
import {Component} from "react";
import * as React from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import './TweetCreator.css'
import tweetsActions from "../Actions/tweetsActions";

class TweetCreator extends Component {

    handleTweet() {
        let tweetBody = this.tweetInput.value;

        if(!tweetBody) {
            return;
        }

        this.props.createTweet(this.props.authentication.clientToken, tweetBody, this.props.referenceTweetId);
    }

    render(){
        return (
            <div className="TweetCreator">
                <FormGroup controlId="formControlsTextarea">
                    <FormControl componentClass="textarea"
                                 placeholder="Share your thoughts!"
                                 inputRef = {ref => this.tweetInput = ref}
                                 style={{"resize": "vertical"}}
                    />
                </FormGroup>
                <Button bsStyle="primary"
                        onClick={this.handleTweet.bind(this)}
                >
                    <i className="fa fa-twitter"/> Tweet!
                </Button>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
};

let mapDispatchToProps = dispatch => {
    return {
        createTweet: (clientToken, tweetBody, referenceTweetId) => {
            dispatch(tweetsActions.createTweet(clientToken, tweetBody, referenceTweetId, () => {
                dispatch(tweetsActions.fetchTweets(clientToken));
            }))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetCreator)