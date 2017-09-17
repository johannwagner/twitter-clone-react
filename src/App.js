import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';

import Header from "./Components/Header";
import TweetList from "./Components/TweetList";
import TweetCreator from "./Components/TweetCreator";

class App extends Component {
    render() {

        let authUsersOnly = (
            <div>
                <TweetCreator/>
                <TweetList/>
            </div>
        );


    return (
        <div className="App">
            <div className="ContentWrapper">
                <div className="Content">
                    <Header/>
                    {this.props.authentication.isAuthenticated ? authUsersOnly : ''}
                </div>
            </div>

        </div>
    );
    }
}

let mapStateToProps = state => { return {
    authentication: state.authentication
}};


export default connect(mapStateToProps)(App);
