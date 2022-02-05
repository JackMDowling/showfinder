import React, { useState, useEffect } from 'react';
import axios from 'axios'
import regeneratorRuntime from "regenerator-runtime";


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
    const [token, setToken] = useState('')
    const [artists, setArtists] = useState([])

   useEffect( () => {
        if(window.location.hash) {
        const { access_token, 
        expires_in,
        token_type
        } = getParamsFromSpotify(window.location.hash)
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
            if(items) {
                const store = [];
                for (let i = 0; i < items.length; i ++) {
                    store.push(items[i].name)
                }
                setArtists(store)
                console.log(store)
                
            }
    }
        
        
            return (
                <div className="app">
                      <a href="/login" className="login-btn">Log in with Spotify</a><br></br>
                      <button onClick={findArtists}>Find Artists</button>
                </div>
            )
    }

