import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

// displays a list of tracks 
export default class Playlist extends React.Component{
    render(){
        return (
            <div className="Playlist">
                
                <input defaultValue={'Add Playlist Name'}/>
                {/* returns a list a list of tracks to display in the playlist */}
                <TrackList tracks={this.props.playlistTracks} ></TrackList>
                
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}