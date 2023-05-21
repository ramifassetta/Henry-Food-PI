import { NavLink } from "react-router-dom"
import "../css/Card.css"

export const Card = (props) => {

  
  return (
    <div className="card">
      <button onClick={() => props.onClose(props.id)} className="closeButton">X</button>
      <NavLink to={`/detail/${props.id}`} className="link">
        <h2 className="name">{props.name}</h2>
      </NavLink>
      <img src={props.image} alt={props.name} className="imagen"/>
      <h2 className="dietType">Diet: {props.dietTypes}</h2>
    </div>
  )
}
