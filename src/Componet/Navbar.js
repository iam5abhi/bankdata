import * as React from 'react';
import{Navbar,Container} from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import './navbar.css'

const NavBar=()=>{
    let activeStyle = {
        textDecoration: "underline",
      };
    
      let activeClassName = "underline";
  return (
     <>   
    
     <div class="navbar">
           <div>
             <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjT3SeZuzXfP5i3gt8o_r7dyXKghV6yyn8_KuDXTT13IBhuEcSKHPWYGVBIPtVIQyj7EqZEPhHnVHvPCG2cN9EGTurzefzUZw0-RjQimtAEMfjm3wPL234KKr98LZ2goIWcfW_F5OgAZD5HPY-v2z-oqfVYXxs_mK-GWR2a9dfxAfatMpf2Ol15OS2YbA/s500/logo.png" alt="img" class="logo"/> 
            </div>
            <div>
                <ul>
                    <li><NavLink to='/createAccount' style={({ isActive }) => isActive ? activeStyle : undefined }>Create Account</NavLink></li>
                    <li><NavLink to='/userlist' style={({ isActive }) => isActive ? activeStyle : undefined }>Home</NavLink></li>
                    <li><NavLink to='/search/account' style={({ isActive }) => isActive ? activeStyle : undefined }>Seach Account Deatils</NavLink></li>
                
                </ul>
                </div>
    </div>

      
     </>
  );
}


 
export default NavBar