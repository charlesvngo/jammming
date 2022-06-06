import './SearchBar.css'

const SearchBar = (props) => {
  const handleChange = (event) => {
    props.onSearch(event.target.value)
  }
  const handleClick = (term) => {
    props.onButtonClick(term)
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" value={props.term} onChange={(event) => handleChange(event)}/>
      <button className="SearchButton" onClick={(event) => handleClick(props.term)}>SEARCH</button>
    </div>
  )
}

export default SearchBar;
