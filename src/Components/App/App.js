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
      ]
    }
  }
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar> </SearchBar>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}></SearchResults>
            <Playlist></Playlist>
          </div>
        </div>
      </div>
    )
  }
}