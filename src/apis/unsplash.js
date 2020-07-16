import axios from 'axios';

export default axios.create ({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 
        'Client-ID HEOyQ1YVOMvbh14uVKF8mFE_g7bINaVmlurEArfn5_I'
    }
})