import { useState } from "react"
import "../css/SearchBar.css"

export const SearchBar = (props) => {

  const [id, setId] = useState("")

  const handleChallenge = (event) => {
    setId(event.target.value);
  }
  
  return (
    <div className="barra">
      <input type="search" value={id} onChange={handleChallenge} className="search"/>
      <button onClick={() => props.onSearch(id) } className="agregar">Add Recipe</button>
    </div>
  )
}
