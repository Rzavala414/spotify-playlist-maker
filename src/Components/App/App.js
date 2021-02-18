import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css'

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [
        {name: "blackMagic", artist: "eminem", album: "music to be murdered by side b", id:1},
        {name: "girl like me", artist: "black eyed peas", album: "music", id: 2},
        {name: "777", artist: "joji", album: "nectar", id: 3}
      ],
      playlistName: 'My new play List',
      playlistTracks: [
        {name: "same me", artist: "dre", album: "comptan", id:5},
        {name: "hips", artist: "shakira", album: "make a title", id: 6}
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // add a new track to the playlist component
  addTrack(track){
    let tracks = this.state.playlistTracks;

    if(tracks.find(savedTrack => savedTrack.id === track.id )){
      return;
    }
    
    tracks.push(track)
    this.setState({tracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar/> 
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} />

            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    )
  }
}