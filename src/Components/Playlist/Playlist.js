import TrackList from '../TrackList/TrackList';
import './Playlist.css'

const Playlist = (props) => {
  const handleNameChange = (event) => {
    const name = event.target.value;
    props.onNameChange(name);
  }



  return (
    <div className="Playlist">
      <input value={props.playlist.name} onChange={(event) => handleNameChange(event)}/>
      <TrackList tracks={props.playlist.tracks} onRemove={props.onRemove} isRemoval={true}/>
      <button className="Playlist-save" onClick={() => props.onSave()}>SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist;