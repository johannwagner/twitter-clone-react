const defaultState = {
    emotes: [],
    emotesAvailable: false,
    emotesPending: false
};


export default function emoteReducer (state  = defaultState, action) {
    switch (action.type) {
        case "FETCH_EMOTES_PENDING":
            return {...state, emotesPending: true}
        case "FETCH_EMOTES_FULFILLED":
            return {...state, emotesPending: false, emotesAvailable: true, emotes: action.payload.data}
        case "FETCH_EMOTES_REJECTED":
            return {...state, emotesPending: false}
        default:
            return state;
    }
}