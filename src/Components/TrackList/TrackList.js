import './TrackList.css'
import Track from '../Track/Track'

const TrackList = (props) => {
  const tracks = props.tracks.map((track) => {
    return (
      <Track 
        key={track.id}
        id={track.id}
        name={track.name}
        artist={track.artist}
        album={track.album}
        isRemoval={props.isRemoval}
        onAdd={props.onAdd}
      />
    )
  })
  return (
    <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {tracks}
    </div>
  )
}

export default TrackList