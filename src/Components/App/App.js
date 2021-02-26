import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css'

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'My new play List',
      playlistTracks: [
        {name: "same me", artist: "dre", album: "comptan", id:5},
        {name: "hips", artist: "shakira", album: "make a title", id: 6}
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    let tracks = this.state.playlistTracks;
    const trackURIs = tracks.map(track => track.uri)
  }

  search(term){    
    Spotify.search(term).then(tracks =>{
      this.setState({searchResults: tracks})
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/> 
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} />

            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}