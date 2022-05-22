import './App.css'
import { useState, useEffect } from 'react';
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist';

function App() {
  const [ searchResults, setSearchResults ] = useState([
    {
      name: "Surrender",
      artist: "Billy Talent",
      album: "Billy Talent II",
      id: "1"
    },
    {
      name: "Fallen Leaves",
      artist: "Billy Talent",
      album: "Billy Talent II",
      id: "2"
    },
    {
      name: "Rusted From the Rain",
      artist: "Billy Talent",
      album: "Billy Talent III",
      id: "3"
    }
  ])

  const [ playlist, setPlaylist ] = useState([
    {
      name: "Surrender",
      artist: "Billy Talent",
      album: "Billy Talent II",
      id: "1"
    }
  ])
  
  const addTrack = (track) => {
    for (const song of playlist) {
      if (song.id !== track.id) setPlaylist([...playlist, {...track}])
    }
  }

  return (
    <>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <div className="App-playlist">
          {/* <!-- Add a SearchResult component --> */}
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          {/* <!-- Add a Playlist component --> */}
          <Playlist playlist={playlist} />
        </div>
      </div>
    </>
  );
}

export default App;
