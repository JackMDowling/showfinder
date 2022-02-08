import React, { useState, useEffect } from 'react';
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";
const { ticket_id } = require("../../config");
import "./styles.css"


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
    const [enableTicket, setTicket] = useState(false)

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
            const topData = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authString
                }});
            // destructuring the data from the 2 get requests
            const { artists } = data
            const { items } = artists
            const store = [];
            const topArtists = topData.data.items
            // these if statesments are nullguards, might not be needed, test later
            if(items && topArtists.length) {
                for (let i = 0; i < items.length; i ++) {
                    store.push(items[i].name)
                }
                for (let j = 0; j < topArtists.length; j++) {
                    store.push(topArtists[j].name)
                }
                let uniqueStore = ([...new Set(store)])
                // see last comment visa vi null guards
                if (uniqueStore.length > 1) {
                    setFollowedArtists(uniqueStore)
                    setTicket(true)
                }
            }
        }
    const findShows = async () => {

        const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&countryCode=US&apikey=${ticket_id}`)
        console.log(data)
    }

        // just tracking the data here
        console.log('this is the artists state', followedArtists)
        
        
            return (
                <div className="app">
                      <a href="/">Home</a><br></br>
                      <a href="/login" className="login-btn">Log in with Spotify</a><br></br>
                      <button onClick={findArtists}>Find Artists</button>
                      <button className={enableTicket ? "ticket" : "hide"} onClick={findShows}>Find Shows</button>
                </div>
            )
    }

