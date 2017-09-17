const defaultState = {
    isAuthenticated: false,
    isAuthenticationPending: false,
    clientToken: null
};


export default function authenticationReducer (state = defaultState, action) {
    switch (action.type) {
        case "AUTHENTICATION_PENDING":
            return {...state, isAuthenticationPending: true};

        case "AUTHENTICATION_FULFILLED":
            return {...state, isAuthenticationPending: false, isAuthenticated: true, clientToken: action.payload.data.clientToken};

        case "AUTHENTICATION_REJECTED":
            return {...state, isAuthenticationPending: false, isAuthenticated: false};

        case "LOGOUT": {
            return {...state, isAuthenticationPending: false, isAuthenticated: false}
        }
        default:
            return state;
    }

}