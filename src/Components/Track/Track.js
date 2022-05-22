import './Track.css'

export const Track = (props) => {

  const renderAction = (isRemoval) => {
    return isRemoval ? '-' : '+';
  }

  const handleClick = (isRemoval) => {
    return isRemoval ? props.onRemove : props.onAdd;
  }


  return (
    <div className="Track">
      <div className="Track-information">
        <h3>
          {/* <!-- track name will go here --> */}
          {props.name}
        </h3>
        <p>
          {/* <!-- track artist will go here--> | <!-- track album will go here --> */}
          {props.artist} | {props.album}
        </p>
      </div>
      <button className="Track-action" onClick={handleClick(props.isRemoval)}>
        {renderAction(props.isRemoval)}
      </button>
    </div>
  )
}

export default Track;