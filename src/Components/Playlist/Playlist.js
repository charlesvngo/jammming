import TrackList from '../TrackList/TrackList';
import './Playlist.css'

const Playlist = (props) => {
  const defaultValue = 'New Playlist';
  return (
    <div className="Playlist">
      <input value={defaultValue}/>
      <TrackList tracks={props.playlist} onRemove={props.onRemove} isRemoval={true}/>
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist;