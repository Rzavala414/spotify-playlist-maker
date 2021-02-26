let accessToken;
const clientID = process.env.REACT_APP_CLIENT_ID;
const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessTokenMatch = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessUrl;
        }

    },

    search(searchTerm){
        const accessToken = this.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        const headers = {Authorization: 'Bearer' + accessToken}

        return fetch(endpoint,  {headers})
        .then(response => response.json())
        .then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
               return jsonResponse.tracks.items.map(track => {
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
    /* fix this to become a .then() instead of try...catch statement */

    //     try {

    //         if(!playlistName || !trackURIs){
    //             return;
    //         }
    
    //         const accessToken = Spotify.getAccessToken();
    //         let userID;
    //         const headers = {
    //             headers: {
    //                 Authorization: 'Bearer ' + accessToken
    //             }
    //         }
            
    //         // obtaining user ID
    //         const response = await fetch('https://api.spotify.com/v1/me', {headers})
    //         userID = response.json();

    //         response = await fetch(`https://api.spotify.com//v1/users/${userID.id}/playlists`, {
    //             method: 'POST',
    //             headers: headers,
    //             body: JSON.stringify(playlistName, trackURIs)
    //         })
    //         const playlistId = response.json();

    //         response = await fetch(`https://api.spotify.com/v1/users/${userID.id}/playlists/${playlistId.id}/tracks`)

    //     } catch (error) {
    //         console.log(error) 
    //     }
   
    }
}

export default Spotify;