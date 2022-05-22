import './App.css'
import { useState, useEffect } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';

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

  const [ playlist, setPlaylist ] = useState({
    name: "New Playlist",
    tracks: [
      {
        name: "Surrender",
        artist: "Billy Talent",
        album: "Billy Talent II",
        id: "1"
      },
      {
        name: "Reckless Paradise",
        artist: "Billy Talent",
        album: "Crisis of Faith",
        id: "4"
      }]
    }
  )

  const [ term, setTerm ] = useState("")
  
  const addTrack = (track) => {
    let isInPlaylist = false;
    for (const song of playlist.tracks) {
      if(song.id === track.id) {
        isInPlaylist = true;
      }
    }
    if (!isInPlaylist) {
      setPlaylist({...playlist, tracks:[...playlist.tracks, track]})
    }
  }

  const removeTrack = (track) => {
    for (const songIndex in playlist.tracks) {
      if (playlist.tracks[songIndex].id === track.id) {
        let array = [...playlist.tracks]
        array.splice(songIndex, 1)
        setPlaylist({ name: playlist.name, tracks: array });
      }
    }
  }

  const updatePlaylistName = (name) => {
    setPlaylist({...playlist, name: name})
  }

  const savePlaylist = () => {
    const trackURIs = [];
    for (const song of playlist.tracks) {
      trackURIs.push(song.id);
    }
    console.log(trackURIs, playlist.name)
  }

  const search = (searchTerm) => {
    setTerm(searchTerm);
    console.log(searchTerm);
  }

  return (
    <>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} term={term}/>
        <div className="App-playlist">
          {/* <!-- Add a SearchResult component --> */}
          <SearchResults searchResults={searchResults} onAdd={addTrack}/>
          {/* <!-- Add a Playlist component --> */}
          <Playlist playlist={playlist} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
        </div>
      </div>
    </>
  );
}

export default App;
