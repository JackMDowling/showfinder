import React, { useState, useEffect } from 'react';
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";


const getParamsFromSpotify = (hash) => {
    // Parses out the auth token that is returned by logging into spotify
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
    const [token, setToken] = useState('')
    const [followedArtists, setFollowedArtists] = useState()

   useEffect( () => {
        if(window.location.hash) {
        const { access_token } = getParamsFromSpotify(window.location.hash)
        setToken(access_token)
        }
    }, [])

    const findArtists = async () => {
        const authString = 'Bearer ' + token;
         const { data } = await axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authString
                }
            });
            const { artists } = data
            const { items } = artists
            const store = [];
            if(items) {
                for (let i = 0; i < items.length; i ++) {
                    store.push(items[i].name)
                }
                
            }
            if (store.length > 1) {
                setFollowedArtists(store)
                console.log('this is the store', store)
            }
            const topArtists = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authString
            }});
            console.log('top here', topArtists)
        }
        console.log('this is the artists state', followedArtists)
        
        
            return (
                <div className="app">
                      <a href="/login" className="login-btn">Log in with Spotify</a><br></br>
                      <button onClick={findArtists}>Find Artists</button>
                </div>
            )
    }

