import * as React from 'react'

/*
const client_id = //my client id
const spotify_url = // spotify auth link
const redirect_url = // my localhost
const scopes = // the data I want to get back from spotify
*/

export const App = function () {


    return (
        <div className="app">
              <a href="/login" className="login-btn">Log in with Spotify</a>
        </div>
    )

}