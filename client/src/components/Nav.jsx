import React from 'react'
import { SearchBar } from './SearchBar';
import { NavLink } from "react-router-dom";
import "../css/Nav.css"

export const Nav = ({onSearch}) => {
  return (
    <div className='nav-container'>
      <div >
        <div className='barraNav'>
          <SearchBar onSearch={onSearch}/>
        </div>
        <NavLink to = "/home">
          <button className='botones' >HOME</button>
        </NavLink>
        <NavLink to="/create">
          <button className='botones'>CREATE</button>
        </NavLink>
      </div>
    </div>
  )
}
