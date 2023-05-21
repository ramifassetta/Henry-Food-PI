import { NavLink } from "react-router-dom";
import "../css/Landing.css";

export const Landing = () => {
  return (
    <div className="landing-container">
      <div className="centro">
        <h1 className="titulo">
          Bienvenido a <span className="negrita">Henry Food</span>
        </h1>
        <NavLink to="/home">
          <button className="boton">
            <div className="nav">Home</div>
          </button>
        </NavLink>
      </div>
    </div>
  );
};
