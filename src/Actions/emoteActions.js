import * as axios from 'axios';

export default {
    fetchEmotes: () => {
        return {
            type: "FETCH_EMOTES",
            payload: axios.get('https://twitchemotes.com/api_cache/v3/global.json')
        }
    },
}