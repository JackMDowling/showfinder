import * as React from 'react'


const getParamsFromSpotify = (hash) => {
    const stringAfterHash = hash.substring(1);
    const paramsInURL = stringAfterHash.split('&');
    const paramsSplit = paramsInURL.reduce((accumulator, current) => {
        const [key, value] = current.split('=');
        accumulator[key] = value;
        return accumulator
    }, {})
    return paramsSplit
}

export const App = function () {

    React.useEffect(() => {
        if(window.location.hash) {
        const { access_token, 
        expires_in,
        token_type
        } = getParamsFromSpotify(window.location.hash)
            console.log(access_token)
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem('expiresIn', expires_in)
        }
    })

    return (
        <div className="app">
              <a href="/login" className="login-btn">Log in with Spotify</a>
        </div>
    )

}