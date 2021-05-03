let accessToken;
const clientID = process.env.REACT_APP_CLIENT_ID;
// const redirectURI = "http://localhost:3000/";
const redirectURI = "https://nifty-goldwasser-3257d2.netlify.app/";

const Spotify = {
    // Grabs access token to spotify api
    getAccessToken(){
        // if we have an accessToken already go ahead and return that token
        if(accessToken){
            return accessToken;
        }
        
        // grabs the accessToken from the url using this regular expression
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        // grabs the expiration time from the url using this regular expression
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessTokenMatch = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            // redirect url 
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }

    },

    search(searchTerm){
        const accessToken = this.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const headers = {Authorization: `Bearer ${accessToken}`}

        return fetch(endpoint,  {headers})
        .then(response => response.json())
        .then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
               return jsonResponse.tracks.items.map(track => {
                    console.log( track.artists[0].name)
                    return {
                        id: track.id,
                        name: track.name,
                        artists: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
        })
        
    },

    savePlaylist(playlistName, trackURIs){
        if(!playlistName || !trackURIs){
            return;
        }
        
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}
       
        
        // Grabs the users Id from spotify 
        fetch('https://api.spotify.com/v1/me',{headers})
        .then(response => response.json())
        .then(jsonResponse =>{
            const clientID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists`, {
                headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            })
        })
        .then(response => response.json())
        .then(jsonResponse => {
            const playlistId = jsonResponse.id;

            return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists/${playlistId}/tracks`, {
                headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            })
        })
    }
}

export default Spotify;