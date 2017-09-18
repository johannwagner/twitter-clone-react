const defaultState = {
    tweets: [],
    tweetsPending: false,
};

export default function(state = defaultState, action) {

    switch(action.type) {
        case "FETCH_TWEETS_PENDING":
            return {...state, tweetsPending: true};
        case "FETCH_TWEETS_FULFILLED":
            return {...state, tweetsPending: false, tweets: action.payload.data};
        case "FETCH_TWEETS_REJECTED":
            return {...state, tweetsPending: false};
        default:
            return state;
    }
}