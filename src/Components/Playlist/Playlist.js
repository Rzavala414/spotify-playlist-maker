import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

// displays a list of tracks 
export default class Playlist extends React.Component{
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        let target = event.target.value;
        this.props.onNameChange(target)
    }


    render(){
        return (
            <div className="Playlist">
                
                <input defaultValue={'Add Playlist Name'} onChange={this.handleNameChange}/>
                {/* returns a list a list of tracks to display in the playlist */}
                <TrackList tracks={this.props.playlistTracks} 
                           onRemove={this.props.onRemove} 
                           isRemoval={true} />
                
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}