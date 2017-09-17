import URLConstants from "../Constants/URLConstants";
import * as axios from 'axios';

export default {
    authenticateUser: (clientId, clientSecret) => {
        return {
            type: 'AUTHENTICATION',
            payload: axios.post(URLConstants.TOKEN_ENDPOINT, {clientId, clientSecret})
        }
    },

    logoutUser: () => {
        return {
            type: 'LOGOUT'
        }
    }

}