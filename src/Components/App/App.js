import './App.css'
import { useEffect, useState } from 'react';
import { Spotify } from '../../util/Spotify';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';


function App() {

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const [ searchResults, setSearchResults ] = useState([])

  const [ playlist, setPlaylist ] = useState({
    name: "New Playlist",
    tracks: []
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
    Spotify.savePlaylist(playlist.name, trackURIs)
  }

  const search = (searchTerm) => {
    setTerm(searchTerm);
  }

  const searchArtist = (term) => {
    Spotify.search(term)
      .then((results) => {
        setSearchResults(results);
      })
  }

  return (
    <>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} term={term} onButtonClick={searchArtist}/>
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
